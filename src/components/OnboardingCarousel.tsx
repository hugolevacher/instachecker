import { useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from './Button'

export type Slide = {
    title: string
    description: string
    imageSrc: string
}

type OnboardingCarouselProps = {
    slides: Slide[]
    baseIndex: number
    overlayIndex: number | null
    overlayMode: 'enter' | 'exit' | null
    direction: number
    isFirstSlide: boolean
    isLastSlide: boolean
    onPrevious: () => void
    onNext: () => void
    onDone: () => void
    onJump: (index: number) => void
    onTransitionEnd: () => void
}

const slideVariants = {
    enter: (direction: number) => ({
        x: direction >= 0 ? '100%' : '-100%',
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction >= 0 ? '-100%' : '100%',
        opacity: 0,
    }),
}

export function OnboardingCarousel({
    slides,
    baseIndex,
    overlayIndex,
    overlayMode,
    direction,
    isFirstSlide,
    isLastSlide,
    onPrevious,
    onNext,
    onDone,
    onJump,
    onTransitionEnd,
}: OnboardingCarouselProps) {
    const current = slides[baseIndex]
    const overlay = overlayIndex !== null ? slides[overlayIndex] : null
    const swipeStartRef = useRef<{ x: number; y: number } | null>(null)

    const handleSwipeStart = (event: ReactPointerEvent<HTMLDivElement>) => {
        event.preventDefault()
        swipeStartRef.current = { x: event.clientX, y: event.clientY }
    }

    const handleSwipeEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
        const swipeStart = swipeStartRef.current

        if (!swipeStart) {
            return
        }

        const swipeDistance = event.clientX - swipeStart.x
        const swipeVerticalDistance = Math.abs(event.clientY - swipeStart.y)
        const swipeThreshold = 60

        swipeStartRef.current = null

        if (swipeVerticalDistance > 80) {
            return
        }

        if (swipeDistance < -swipeThreshold) {
            if (isLastSlide) {
                onDone()
            } else {
                onNext()
            }
            return
        }

        if (swipeDistance > swipeThreshold) {
            onPrevious()
        }
    }

    return (
        <div className="grid w-fit gap-8 px-0 sm:gap-10 lg:grid-cols-[fit-content(15.25rem)_fit-content(20rem)] lg:gap-12 lg:items-center">
            <div className="mx-auto w-[12.5rem] shrink-0 sm:w-[13.25rem] lg:w-[15.25rem]">
                <div className="relative mx-auto aspect-[1059/2235] w-full overflow-hidden rounded-[1.95rem] border-[7px] border-slate-950 bg-slate-950 shadow-[0_22px_70px_rgba(15,23,42,0.18)]">
                    <div className="absolute left-1/2 top-0 z-20 h-3 w-20 -translate-x-1/2 rounded-b-[0.85rem] bg-slate-950" />
                    <div className="absolute left-1/2 top-2 z-30 h-1.5 w-14 -translate-x-1/2 rounded-full bg-white/25" />
                    <div className="absolute right-[-10px] top-18 z-10 h-8 w-1.5 rounded-r-full bg-slate-900" />
                    <div className="absolute right-[-10px] top-28 z-10 h-12 w-1.5 rounded-r-full bg-slate-900" />
                    <div className="absolute left-[-10px] top-22 z-10 h-6 w-1.5 rounded-l-full bg-slate-900" />

                    <img
                        src={current.imageSrc}
                        alt={current.title}
                        draggable={false}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(225,48,108,0.08),transparent_45%),linear-gradient(180deg,rgba(15,23,42,0.05),transparent_30%)]" />

                    <AnimatePresence initial={false} custom={direction}>
                        {overlay ? (
                            <motion.div
                                key={`${overlayMode}-${overlayIndex}`}
                                custom={direction}
                                variants={slideVariants}
                                initial={overlayMode === 'exit' ? 'center' : 'enter'}
                                animate={overlayMode === 'exit' ? 'exit' : 'center'}
                                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.28 }}
                                onAnimationComplete={onTransitionEnd}
                                className="absolute inset-0 z-10 overflow-hidden rounded-[2.5rem]"
                            >
                                <img
                                    src={overlay.imageSrc}
                                    alt={overlay.title}
                                    draggable={false}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(225,48,108,0.08),transparent_45%),linear-gradient(180deg,rgba(15,23,42,0.05),transparent_30%)]" />
                            </motion.div>
                        ) : null}
                    </AnimatePresence>

                    <div
                        className="absolute inset-0 z-20 cursor-grab touch-pan-y select-none active:cursor-grabbing"
                        aria-hidden="true"
                        onPointerDown={handleSwipeStart}
                        onPointerUp={handleSwipeEnd}
                        onPointerCancel={() => {
                            swipeStartRef.current = null
                        }}
                    />
                </div>
            </div>

            <div className="flex h-full w-fit items-center justify-self-start">
                <div className="flex w-full max-w-[20rem] flex-col justify-center gap-4 sm:max-w-[21rem] sm:gap-5 lg:max-w-[20rem]">
                    <div className="min-h-[6.5rem] space-y-1.5 sm:min-h-[9.5rem] sm:space-y-2 lg:min-h-[10rem]">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#e1306c] sm:text-xs sm:tracking-[0.3em]">
                            Step {baseIndex + 1} of {slides.length}
                        </p>
                        <h3 className="text-lg font-semibold tracking-tight text-slate-950 sm:text-2xl">{current.title}</h3>
                        <p className="text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">{current.description}</p>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                        {slides.map((slide, slideIndex) => (
                            <button
                                key={slide.title}
                                type="button"
                                onClick={() => onJump(slideIndex)}
                                className={`h-3.5 rounded-full transition-all sm:h-2.5 ${slideIndex === baseIndex ? 'w-9 bg-[#e1306c] sm:w-8' : 'w-3.5 bg-slate-200 sm:w-2.5'
                                    }`}
                                aria-label={`Go to slide ${slideIndex + 1}`}
                            />
                        ))}
                    </div>

                    <p className="text-[0.65rem] font-medium tracking-[0.12em] text-slate-400 sm:hidden">
                        Swipe left or right to browse.
                    </p>

                    <div className="hidden flex-wrap gap-3 pt-1 sm:flex">
                        <Button onClick={onPrevious} disabled={isFirstSlide}>
                            Previous
                        </Button>
                        <Button variant="primary" onClick={isLastSlide ? onDone : onNext}>
                            {isLastSlide ? 'Done!' : 'Next'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}