import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import copy from './content/copy.json'
import { Modal } from './components/Modal'
import { OnboardingCarousel } from './components/OnboardingCarousel'
import { AppHeader } from './features/app/AppHeader'
import { HeroPanel } from './features/app/HeroPanel'
import { ResultsPanel } from './features/app/ResultsPanel'
import type { RelationshipKey } from './features/app/types'
import { useInstagramAnalyzer } from './hooks/useInstagramAnalyzer'

function getGuideDirection(previousIndex: number, nextIndex: number, total: number) {
  if (previousIndex === nextIndex) {
    return 0
  }

  if ((previousIndex + 1) % total === nextIndex) {
    return 1
  }

  if ((previousIndex - 1 + total) % total === nextIndex) {
    return -1
  }

  return nextIndex > previousIndex ? 1 : -1
}

async function copyUsernames(usernames: string[]) {
  await navigator.clipboard.writeText(usernames.join('\n'))
}

function App() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const resultsRef = useRef<HTMLElement | null>(null)
  const copyResetTimerRef = useRef<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const [overlaySlideIndex, setOverlaySlideIndex] = useState<number | null>(null)
  const [overlayMode, setOverlayMode] = useState<'enter' | 'exit' | null>(null)
  const [slideDirection, setSlideDirection] = useState(1)
  const [activeTab, setActiveTab] = useState<RelationshipKey>('notFollowingBack')
  const [searchByTab, setSearchByTab] = useState<Record<RelationshipKey, string>>({
    notFollowingBack: '',
    fans: '',
    mutuals: '',
  })
  const [copiedTab, setCopiedTab] = useState<RelationshipKey | null>(null)
  const { analysis, error, isParsing, analyzeFile, reset } = useInstagramAnalyzer()

  useEffect(() => {
    if (!analysis || isParsing || window.innerWidth >= 768) {
      return
    }

    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [analysis, isParsing])

  useEffect(() => {
    const handleWindowDragEnter = () => setIsDragging(true)
    const handleWindowDragLeave = (event: DragEvent) => {
      if (event.relatedTarget === null) {
        setIsDragging(false)
      }
    }
    const handleWindowDrop = () => setIsDragging(false)
    const handleWindowDragEnd = () => setIsDragging(false)

    window.addEventListener('dragenter', handleWindowDragEnter)
    window.addEventListener('dragleave', handleWindowDragLeave)
    window.addEventListener('drop', handleWindowDrop)
    window.addEventListener('dragend', handleWindowDragEnd)

    return () => {
      window.removeEventListener('dragenter', handleWindowDragEnter)
      window.removeEventListener('dragleave', handleWindowDragLeave)
      window.removeEventListener('drop', handleWindowDrop)
      window.removeEventListener('dragend', handleWindowDragEnd)
    }
  }, [])

  const handleBrowse = () => {
    fileInputRef.current?.click()
  }

  const openGuide = () => {
    setSlideIndex(0)
    setOverlaySlideIndex(null)
    setOverlayMode(null)
    setShowGuide(true)
  }

  const closeGuide = () => {
    setShowGuide(false)
    setOverlaySlideIndex(null)
    setOverlayMode(null)
    setSlideIndex(0)
  }

  const handleFileSelected = async (file: File) => {
    reset()
    setActiveTab('notFollowingBack')
    setCopiedTab(null)
    setSearchByTab({
      notFollowingBack: '',
      fans: '',
      mutuals: '',
    })
    await analyzeFile(file)
  }

  const goToPreviousSlide = () => {
    if (overlaySlideIndex !== null) {
      return
    }

    if (slideIndex === 0) {
      return
    }

    const previousIndex = slideIndex - 1
    setSlideDirection(-1)
    setSlideIndex(previousIndex)
    setOverlayMode('exit')
    setOverlaySlideIndex(slideIndex)
  }

  const goToNextSlide = () => {
    if (overlaySlideIndex !== null) {
      return
    }

    if (slideIndex === copy.guide.slides.length - 1) {
      closeGuide()
      return
    }

    setSlideDirection(1)
    setOverlayMode('enter')
    setOverlaySlideIndex(slideIndex + 1)
  }

  const jumpToSlide = (nextIndex: number) => {
    if (overlaySlideIndex !== null || nextIndex === slideIndex) {
      return
    }

    setSlideDirection(getGuideDirection(slideIndex, nextIndex, copy.guide.slides.length) || slideDirection)
    setOverlayMode('enter')
    setOverlaySlideIndex(nextIndex)
  }

  const handleTransitionEnd = () => {
    if (overlaySlideIndex === null) {
      return
    }

    if (overlayMode === 'enter') {
      setSlideIndex(overlaySlideIndex)
    }

    setOverlaySlideIndex(null)
    setOverlayMode(null)
  }

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      await handleFileSelected(file)
      event.target.value = ''
    }
  }

  const handleCopy = async (usernames: string[]) => {
    if (usernames.length === 0) {
      return
    }

    try {
      await copyUsernames(usernames)
      setCopiedTab(activeTab)

      if (copyResetTimerRef.current) {
        window.clearTimeout(copyResetTimerRef.current)
      }

      copyResetTimerRef.current = window.setTimeout(() => {
        setCopiedTab(null)
      }, 1400)
    } catch {
      // Clipboard permissions can vary by browser; keep the UI silent.
    }
  }

  const activeSearch = searchByTab[activeTab]

  const updateActiveSearch = (value: string) => {
    setSearchByTab((current) => ({
      ...current,
      [activeTab]: value,
    }))
  }

  const openInstagramAccount = (username: string) => {
    const target = window.navigator.userAgent.toLowerCase().includes('mobile')
      ? `instagram://user?username=${encodeURIComponent(username)}`
      : `https://www.instagram.com/${encodeURIComponent(username)}/`

    window.open(target, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden text-slate-700"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault()
        const file = event.dataTransfer.files?.[0]
        if (file) {
          void handleFileSelected(file)
        }
        setIsDragging(false)
      }}
    >
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(225,48,108,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(247,119,55,0.12),transparent_28%),linear-gradient(180deg,#fff7fb_0%,#ffffff_74%,#f8fafc_100%)] bg-fixed" />
      <div
        className={`pointer-events-none fixed inset-1 z-50 rounded-3xl border-4 border-dashed border-[#e1306c]/80 sm:inset-3 sm:rounded-4xl transition-opacity duration-200 ${isDragging ? 'opacity-100' : 'opacity-0'
          }`}
      />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <AppHeader />

        <main className="mt-8 grid flex-1 gap-6 lg:mt-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <HeroPanel
            isParsing={isParsing}
            error={error}
            onOpenGuide={openGuide}
            onBrowse={handleBrowse}
            onFileSelected={handleFileSelected}
          />

          <input
            ref={fileInputRef}
            type="file"
            accept=".zip"
            className="hidden"
            onChange={handleInputChange}
          />

          <section ref={resultsRef} className="space-y-4 lg:pt-1">
            {analysis ? (
              <ResultsPanel
                analysis={analysis}
                activeTab={activeTab}
                searchValue={activeSearch}
                onTabChange={setActiveTab}
                onSearchChange={updateActiveSearch}
                onCopy={() => handleCopy(analysis[activeTab])}
                copied={copiedTab === activeTab}
                onOpenAccount={openInstagramAccount}
              />
            ) : (
              <div className="rounded-4xl border border-dashed border-slate-200 bg-white/80 p-8 text-sm leading-7 text-slate-500 shadow-sm">
                {copy.results.placeholder}
              </div>
            )}
          </section>
        </main>
      </div>

      <Modal open={showGuide} title={copy.guide.title} onClose={() => setShowGuide(false)}>
        <OnboardingCarousel
          slides={copy.guide.slides}
          baseIndex={slideIndex}
          overlayIndex={overlaySlideIndex}
          overlayMode={overlayMode}
          direction={slideDirection}
          isFirstSlide={slideIndex === 0}
          isLastSlide={slideIndex === copy.guide.slides.length - 1}
          onPrevious={goToPreviousSlide}
          onNext={goToNextSlide}
          onDone={closeGuide}
          onJump={jumpToSlide}
          onTransitionEnd={handleTransitionEnd}
        />
      </Modal>

    </div>
  )
}

export default App
