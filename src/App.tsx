import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'
import { Button } from './components/Button'
import { Modal } from './components/Modal'
import { OnboardingCarousel, type Slide } from './components/OnboardingCarousel'
import { RelationshipSection } from './components/RelationshipSection'
import { UploadZone } from './components/UploadZone'
import { useInstagramAnalyzer } from './hooks/useInstagramAnalyzer'

type RelationshipKey = 'notFollowingBack' | 'fans' | 'mutuals'

const relationshipTabs: Array<{
  key: RelationshipKey
  label: string
  mobileLabel: string
}> = [
    { key: 'notFollowingBack', label: 'No Followback', mobileLabel: 'No Followback' },
    { key: 'fans', label: 'Fans', mobileLabel: 'Fans' },
    { key: 'mutuals', label: 'Mutuals', mobileLabel: 'Mutuals' },
  ]

const slides: Slide[] = [
  {
    title: 'Open Instagram settings',
    description:
      'Start in Accounts Center and open the section where Instagram lets you access and download your information.',
    imageSrc: '/images/step_1_information_and_permissions.png',
  },
  {
    title: 'Choose your Instagram data',
    description:
      'Pick the profile and information you want to export, then continue to the download flow.',
    imageSrc: '/images/step_2_export_your_information.png',
  },
  {
    title: 'Create the export',
    description:
      'Select the export details and request the archive from Instagram.',
    imageSrc: '/images/step_3_create_export.png',
  },
  {
    title: 'Send it to your device',
    description:
      'Choose to export to the device you are using so the ZIP is easy to download right away.',
    imageSrc: '/images/step_4_export_to_device.png',
  },
  {
    title: 'Review the options',
    description:
      'Keep the default download settings or adjust the format before continuing.',
    imageSrc: '/images/step_5_select_options.png',
  },
  {
    title: 'Download the ZIP',
    description:
      'Confirm the final step and download the archive. Then upload the ZIP into this app.',
    imageSrc: '/images/step_6_download.png',
  },
]

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

  const sections = useMemo(
    () =>
      analysis
        ? {
          notFollowingBack: {
            title: 'No Followback',
            count: analysis.notFollowingBackCount,
            usernames: analysis.notFollowingBack,
            emptyLabel: 'Everyone in this list follows you back already.',
          },
          fans: {
            title: 'Fans',
            count: analysis.fansCount,
            usernames: analysis.fans,
            emptyLabel: 'No fans detected in this export.',
          },
          mutuals: {
            title: 'Mutuals',
            count: analysis.mutualCount,
            usernames: analysis.mutuals,
            emptyLabel: 'There are no mutual follows in this export.',
          },
        }
        : null,
    [analysis],
  )

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

    const previousIndex = (slideIndex - 1 + slides.length) % slides.length
    setSlideDirection(-1)
    setSlideIndex(previousIndex)
    setOverlayMode('exit')
    setOverlaySlideIndex(slideIndex)
  }

  const goToNextSlide = () => {
    if (overlaySlideIndex !== null) {
      return
    }

    setSlideDirection(1)
    setOverlayMode('enter')
    setOverlaySlideIndex((slideIndex + 1) % slides.length)
  }

  const jumpToSlide = (nextIndex: number) => {
    if (overlaySlideIndex !== null || nextIndex === slideIndex) {
      return
    }

    setSlideDirection(getGuideDirection(slideIndex, nextIndex, slides.length) || slideDirection)
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

  const handleTabChange = (tab: RelationshipKey) => {
    setActiveTab(tab)
  }

  const activeSection = sections ? sections[activeTab] : undefined
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
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(225,48,108,0.12),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(247,119,55,0.12),_transparent_28%),linear-gradient(180deg,_#fff7fb_0%,_#ffffff_74%,_#f8fafc_100%)] bg-fixed" />
      <div
        className={`pointer-events-none fixed inset-1 z-50 rounded-[1.5rem] border-[4px] border-dashed border-[#e1306c]/80 sm:inset-3 sm:rounded-[2rem] transition-opacity duration-200 ${isDragging ? 'opacity-100' : 'opacity-0'
          }`}
      />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#e1306c]">
              Instagram Relationship Analyzer
            </p>
          </div>
          <div className="self-start rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-left text-[11px] font-medium leading-tight text-slate-500 shadow-sm sm:px-4 sm:text-xs md:max-w-[18rem]">
            No login • No tracking • No data stored
          </div>
        </header>

        <main className="mt-8 grid flex-1 gap-6 lg:mt-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <section className="space-y-6 rounded-[2.25rem] border border-white/80 bg-white/75 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8 lg:sticky lg:top-6">
            <div className="space-y-4">
              <div className="inline-flex rounded-full border border-[#e1306c]/15 bg-[#e1306c]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#e1306c]">
                Private by design
              </div>
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                See who follows you back–and who doesn’t
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Load your Instagram data and get a clear follower breakdown in seconds.
                Everything stays on your device.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" onClick={() => setShowGuide(true)} className="sm:px-6">
                How to get your data
              </Button>
              <Button
                variant="secondary"
                onClick={handleBrowse}
                className="sm:px-6 md:hidden !bg-transparent !shadow-none"
              >
                Select ZIP file
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".zip"
                className="hidden"
                onChange={handleInputChange}
              />
            </div>

            <div className="hidden md:block">
              <UploadZone
                isParsing={isParsing}
                onBrowse={handleBrowse}
                onFileSelected={handleFileSelected}
              />
            </div>

            {isParsing ? (
              <div className="rounded-[1.5rem] border border-[#e1306c]/20 bg-[#e1306c]/5 px-4 py-3 text-sm text-[#b11f54]">
                Parsing the archive locally. Large exports may take a moment.
              </div>
            ) : null}

            {error ? (
              <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}
          </section>

          <section ref={resultsRef} className="space-y-4 lg:pt-1">
            {analysis && sections ? (
              <div className="rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur sm:p-5">
                <div className="grid grid-cols-3 gap-2">
                  {relationshipTabs.map(({ key: tab, label, mobileLabel }) => {
                    const isActive = activeTab === tab

                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => handleTabChange(tab)}
                        className={`rounded-2xl border px-3 py-3 text-left transition active:scale-[0.98] ${isActive
                          ? 'border-[#e1306c] bg-[#e1306c] text-white shadow-lg shadow-pink-500/20'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
                          }`}
                      >
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] opacity-80 sm:hidden">
                          {mobileLabel}
                        </span>
                        <span className="hidden text-xs font-semibold uppercase tracking-[0.25em] opacity-80 sm:block">
                          {label}
                        </span>
                        <span className="mt-1 block text-base font-semibold sm:text-lg">
                          {sections[tab].count}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-4">
                  {activeSection ? (
                    <RelationshipSection
                      usernames={activeSection.usernames}
                      searchValue={activeSearch}
                      onSearchChange={updateActiveSearch}
                      onCopy={() => handleCopy(activeSection.usernames)}
                      copied={copiedTab === activeTab}
                      onOpenAccount={openInstagramAccount}
                      emptyLabel={activeSection.emptyLabel}
                    />
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white/80 p-8 text-sm leading-7 text-slate-500 shadow-sm">
                Your results will appear here after you load your data.
              </div>
            )}
          </section>
        </main>
      </div>

      <Modal open={showGuide} title="How to export your Instagram data" onClose={() => setShowGuide(false)}>
        <OnboardingCarousel
          slides={slides}
          baseIndex={slideIndex}
          overlayIndex={overlaySlideIndex}
          overlayMode={overlayMode}
          direction={slideDirection}
          onPrevious={goToPreviousSlide}
          onNext={goToNextSlide}
          onJump={jumpToSlide}
          onTransitionEnd={handleTransitionEnd}
        />
      </Modal>
    </div>
  )
}

export default App
