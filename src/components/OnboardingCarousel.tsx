import { useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from './Button'
import { Text } from './ui/Text'
import { cn } from '../lib/cn'
import { onboardingCarouselTheme } from '../theme/features/app/onboardingCarousel'

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
        <div className={onboardingCarouselTheme.root}>
            <div className={onboardingCarouselTheme.phoneColumn}>
                <div className={onboardingCarouselTheme.phoneFrame}>
                    <div className={onboardingCarouselTheme.notch} />
                    <div className={onboardingCarouselTheme.receiver} />
                    <div className={onboardingCarouselTheme.sideTop} />
                    <div className={onboardingCarouselTheme.sideMid} />
                    <div className={onboardingCarouselTheme.sideLeft} />

                    <img
                        src={current.imageSrc}
                        alt={current.title}
                        draggable={false}
                        className={onboardingCarouselTheme.image}
                    />
                    <div className={onboardingCarouselTheme.shade} />

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
                                className={onboardingCarouselTheme.overlay}
                            >
                                <img
                                    src={overlay.imageSrc}
                                    alt={overlay.title}
                                    draggable={false}
                                    className={onboardingCarouselTheme.overlayImage}
                                />
                                <div className={onboardingCarouselTheme.shade} />
                            </motion.div>
                        ) : null}
                    </AnimatePresence>

                    <div
                        className={onboardingCarouselTheme.swipeLayer}
                        aria-hidden="true"
                        onPointerDown={handleSwipeStart}
                        onPointerUp={handleSwipeEnd}
                        onPointerCancel={() => {
                            swipeStartRef.current = null
                        }}
                    />
                </div>
            </div>

            <div className={onboardingCarouselTheme.contentColumn}>
                <div className={onboardingCarouselTheme.contentInner}>
                    <div className={onboardingCarouselTheme.copyBlock}>
                        <Text as="p" variant="overline" className={onboardingCarouselTheme.stepLabel}>
                            Step {baseIndex + 1} of {slides.length}
                        </Text>
                        <Text as="h3" variant="subheading" className={onboardingCarouselTheme.title}>
                            {current.title}
                        </Text>
                        <Text as="p" variant="body" className={onboardingCarouselTheme.description}>
                            {current.description}
                        </Text>
                    </div>

                    <div className={onboardingCarouselTheme.dots}>
                        {slides.map((slide, slideIndex) => (
                            <button
                                key={slide.title}
                                type="button"
                                onClick={() => onJump(slideIndex)}
                                className={cn(
                                    onboardingCarouselTheme.dot,
                                    slideIndex === baseIndex ? onboardingCarouselTheme.dotActive : onboardingCarouselTheme.dotInactive,
                                )}
                                aria-label={`Go to slide ${slideIndex + 1}`}
                            />
                        ))}
                    </div>

                    <Text as="p" variant="caption" className={onboardingCarouselTheme.hint}>
                        Swipe left or right to browse.
                    </Text>

                    <div className={onboardingCarouselTheme.actions}>
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