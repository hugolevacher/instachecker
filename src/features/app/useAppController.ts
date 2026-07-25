import { useCallback, useEffect, useRef, useState, type ChangeEvent, type RefObject } from 'react'
import copy from '../../content/appText.json'
import { useInstagramAnalyzer } from '../../hooks/useInstagramAnalyzer'
import type { RelationshipKey } from './types'

async function copyUsernames(usernames: string[]) {
    await navigator.clipboard.writeText(usernames.join('\n'))
}

function openInstagramProfileWithFallback(username: string) {
    const profileUrl = `https://www.instagram.com/${encodeURIComponent(username)}/`
    const appUrl = `instagram://user?username=${encodeURIComponent(username)}`

    const isMobile = window.navigator.userAgent.toLowerCase().includes('mobile')

    if (!isMobile) {
        window.open(profileUrl, '_blank', 'noopener,noreferrer')
        return
    }

    const appFrame = document.createElement('iframe')
    appFrame.style.display = 'none'
    appFrame.src = appUrl
    document.body.appendChild(appFrame)

    window.setTimeout(() => {
        appFrame.remove()
        if (document.visibilityState === 'visible') {
            window.open(profileUrl, '_blank', 'noopener,noreferrer')
        }
    }, 700)
}

export type UploadMode = 'zip' | 'direct'

// Inferred from the hook's return value — a hand-written mirror only drifts.
export type AppController = ReturnType<typeof useAppController>

type AppControllerRefs = {
    fileInputRef: RefObject<HTMLInputElement | null>
    resultsRef: RefObject<HTMLElement | null>
}

export function useAppController({ fileInputRef, resultsRef }: AppControllerRefs) {
    const copyResetTimerRef = useRef<number | null>(null)
    const [mode, setMode] = useState<UploadMode>('direct')
    const [pasteValue, setPasteValue] = useState('')
    const [showExporter, setShowExporter] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [showGuide, setShowGuide] = useState(false)
    // AnimatePresence choreographs the slide transition from the index alone;
    // direction only tells it which way to animate.
    const [slideIndex, setSlideIndex] = useState(0)
    const [slideDirection, setSlideDirection] = useState(1)
    const [activeTab, setActiveTab] = useState<RelationshipKey>('notFollowingBack')
    const [searchByTab, setSearchByTab] = useState<Record<RelationshipKey, string>>({
        notFollowingBack: '',
        fans: '',
        mutuals: '',
    })
    const [copiedTab, setCopiedTab] = useState<RelationshipKey | null>(null)
    const { analysis, error, isParsing, analyzeFile, analyzeText, reset } = useInstagramAnalyzer()

    useEffect(() => {
        if (!analysis || isParsing || window.innerWidth >= 768) {
            return
        }

        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [analysis, isParsing, resultsRef])

    useEffect(() => () => {
        if (copyResetTimerRef.current) {
            window.clearTimeout(copyResetTimerRef.current)
        }
    }, [])

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

    const handleBrowse = useCallback(() => {
        fileInputRef.current?.click()
    }, [fileInputRef])

    const openExporter = useCallback(() => setShowExporter(true), [])
    const closeExporter = useCallback(() => setShowExporter(false), [])

    const openGuide = useCallback(() => {
        setSlideIndex(0)
        setSlideDirection(1)
        setShowGuide(true)
    }, [])

    const closeGuide = useCallback(() => {
        setShowGuide(false)
        setSlideIndex(0)
    }, [])

    const resetResultsState = useCallback(() => {
        reset()
        setActiveTab('notFollowingBack')
        setCopiedTab(null)
        setSearchByTab({
            notFollowingBack: '',
            fans: '',
            mutuals: '',
        })
    }, [reset])

    const handleFileSelected = useCallback(
        async (file: File) => {
            resetResultsState()
            await analyzeFile(file)
        },
        [analyzeFile, resetResultsState],
    )

    const analyzePaste = useCallback(async () => {
        if (!pasteValue.trim()) {
            return
        }

        resetResultsState()
        await analyzeText(pasteValue)
    }, [analyzeText, pasteValue, resetResultsState])

    const goToPreviousSlide = useCallback(() => {
        if (slideIndex === 0) {
            return
        }

        setSlideDirection(-1)
        setSlideIndex(slideIndex - 1)
    }, [slideIndex])

    const goToNextSlide = useCallback(() => {
        if (slideIndex === copy.guide.slides.length - 1) {
            closeGuide()
            return
        }

        setSlideDirection(1)
        setSlideIndex(slideIndex + 1)
    }, [closeGuide, slideIndex])

    const jumpToSlide = useCallback(
        (nextIndex: number) => {
            if (nextIndex === slideIndex) {
                return
            }

            setSlideDirection(nextIndex > slideIndex ? 1 : -1)
            setSlideIndex(nextIndex)
        },
        [slideIndex],
    )

    const handleInputChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0]
            if (file) {
                await handleFileSelected(file)
                event.target.value = ''
            }
        },
        [handleFileSelected],
    )

    const handleCopy = useCallback(
        async (usernames: string[]) => {
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
        },
        [activeTab],
    )

    const copyActiveTab = useCallback(() => {
        return handleCopy(analysis?.[activeTab] ?? [])
    }, [activeTab, analysis, handleCopy])

    const activeSearch = searchByTab[activeTab]

    const updateActiveSearch = useCallback((value: string) => {
        setSearchByTab((current) => ({
            ...current,
            [activeTab]: value,
        }))
    }, [activeTab])

    const openInstagramAccount = useCallback((username: string) => {
        openInstagramProfileWithFallback(username)
    }, [])

    return {
        mode,
        pasteValue,
        showExporter,
        openExporter,
        closeExporter,
        setMode,
        setPasteValue,
        analyzePaste,
        isDragging,
        showGuide,
        slideIndex,
        slideDirection,
        activeTab,
        activeSearch,
        copiedTab,
        analysis,
        error,
        isParsing,
        guideTitle: copy.guide.title,
        guideSlides: copy.guide.slides,
        openGuide,
        closeGuide,
        handleBrowse,
        handleFileSelected,
        handleInputChange,
        goToPreviousSlide,
        goToNextSlide,
        jumpToSlide,
        handleCopy,
        copyActiveTab,
        updateActiveSearch,
        setActiveTab,
        openInstagramAccount,
    }
}
