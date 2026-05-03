import { useCallback, useEffect, useRef, useState, type ChangeEvent, type RefObject } from 'react'
import copy from '../../content/appText.json'
import { useInstagramAnalyzer } from '../../hooks/useInstagramAnalyzer'
import type { RelationshipKey } from './types'

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
        if (document.visibilityState === 'visible') {
            appFrame.remove()
            window.open(profileUrl, '_blank', 'noopener,noreferrer')
        }
    }, 700)
}

export type AppController = {
    isDragging: boolean
    showGuide: boolean
    slideIndex: number
    overlaySlideIndex: number | null
    overlayMode: 'enter' | 'exit' | null
    slideDirection: number
    activeTab: RelationshipKey
    activeSearch: string
    copiedTab: RelationshipKey | null
    analysis: ReturnType<typeof useInstagramAnalyzer>['analysis']
    error: ReturnType<typeof useInstagramAnalyzer>['error']
    isParsing: boolean
    guideTitle: string
    guideSlides: typeof copy.guide.slides
    openGuide: () => void
    closeGuide: () => void
    handleBrowse: () => void
    handleFileSelected: (file: File) => Promise<void>
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>
    goToPreviousSlide: () => void
    goToNextSlide: () => void
    jumpToSlide: (nextIndex: number) => void
    handleTransitionEnd: () => void
    handleCopy: (usernames: string[]) => Promise<void>
    copyActiveTab: () => Promise<void>
    updateActiveSearch: (value: string) => void
    setActiveTab: (tab: RelationshipKey) => void
    openInstagramAccount: (username: string) => void
}

type AppControllerRefs = {
    fileInputRef: RefObject<HTMLInputElement | null>
    resultsRef: RefObject<HTMLElement | null>
}

export function useAppController({ fileInputRef, resultsRef }: AppControllerRefs): AppController {
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
    }, [analysis, isParsing, resultsRef])

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
    }, [resultsRef])

    const handleBrowse = useCallback(() => {
        fileInputRef.current?.click()
    }, [fileInputRef])

    const openGuide = useCallback(() => {
        setSlideIndex(0)
        setOverlaySlideIndex(null)
        setOverlayMode(null)
        setShowGuide(true)
    }, [])

    const closeGuide = useCallback(() => {
        setShowGuide(false)
        setOverlaySlideIndex(null)
        setOverlayMode(null)
        setSlideIndex(0)
    }, [])

    const handleFileSelected = useCallback(
        async (file: File) => {
            reset()
            setActiveTab('notFollowingBack')
            setCopiedTab(null)
            setSearchByTab({
                notFollowingBack: '',
                fans: '',
                mutuals: '',
            })
            await analyzeFile(file)
        },
        [analyzeFile, reset],
    )

    const goToPreviousSlide = useCallback(() => {
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
    }, [overlaySlideIndex, slideIndex])

    const goToNextSlide = useCallback(() => {
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
    }, [closeGuide, overlaySlideIndex, slideIndex])

    const jumpToSlide = useCallback(
        (nextIndex: number) => {
            if (overlaySlideIndex !== null || nextIndex === slideIndex) {
                return
            }

            setSlideDirection(getGuideDirection(slideIndex, nextIndex, copy.guide.slides.length) || slideDirection)
            setOverlayMode('enter')
            setOverlaySlideIndex(nextIndex)
        },
        [overlaySlideIndex, slideDirection, slideIndex],
    )

    const handleTransitionEnd = useCallback(() => {
        if (overlaySlideIndex === null) {
            return
        }

        if (overlayMode === 'enter') {
            setSlideIndex(overlaySlideIndex)
        }

        setOverlaySlideIndex(null)
        setOverlayMode(null)
    }, [overlayMode, overlaySlideIndex])

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
        isDragging,
        showGuide,
        slideIndex,
        overlaySlideIndex,
        overlayMode,
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
        handleTransitionEnd,
        handleCopy,
        copyActiveTab,
        updateActiveSearch,
        setActiveTab,
        openInstagramAccount,
    }
}
