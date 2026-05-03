import { useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from './Button'
import { Text } from './ui/Text'
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
    const carouselTheme = onboardingCarouselTheme()
    const current = slides[baseIndex]
    const overlay = overlayIndex !== null ? slides[overlayIndex] : null
    const swipeStartRef = useRef<{ x: number; y: number } | null>(null)

    const handleSwipeStart = (event: ReactPointerEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement | null

        if (target?.closest('button, a, input, textarea, select, [role="button"]')) {
            return
        }

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
        <div
            className={carouselTheme.root()}
            onPointerDown={handleSwipeStart}
            onPointerUp={handleSwipeEnd}
            onPointerCancel={() => {
                swipeStartRef.current = null
            }}
        >
            <div className={carouselTheme.phoneColumn()}>
                <div className={carouselTheme.phoneFrame()}>
                    <div className={carouselTheme.notch()} />
                    <div className={carouselTheme.receiver()} />
                    <div className={carouselTheme.sideTop()} />
                    <div className={carouselTheme.sideMid()} />
                    <div className={carouselTheme.sideLeft()} />

                    <img
                        src={current.imageSrc}
                        alt={current.title}
                        draggable={false}
                        className={carouselTheme.image()}
                    />
                    <div className={carouselTheme.shade()} />

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
                                className={carouselTheme.overlay()}
                            >
                                <img
                                    src={overlay.imageSrc}
                                    alt={overlay.title}
                                    draggable={false}
                                    className={carouselTheme.overlayImage()}
                                />
                                <div className={carouselTheme.shade()} />
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>

            <div className={carouselTheme.contentColumn()}>
                <div className={carouselTheme.contentInner()}>
                    <div className={carouselTheme.copyBlock()}>
                        <Text as="p" variant="overline" className={carouselTheme.stepLabel()}>
                            Step {baseIndex + 1} of {slides.length}
                        </Text>
                        <Text as="h3" variant="subheading" className={carouselTheme.title()}>
                            {current.title}
                        </Text>
                        <Text as="p" variant="body" className={carouselTheme.description()}>
                            {current.description}
                        </Text>
                    </div>

                    <div className={carouselTheme.dots()}>
                        {slides.map((slide, slideIndex) => {
                            const dotTheme = onboardingCarouselTheme({ active: slideIndex === baseIndex })

                            return (
                                <button
                                    key={slide.title}
                                    type="button"
                                    onClick={() => onJump(slideIndex)}
                                    className={dotTheme.dot()}
                                    aria-label={`Go to slide ${slideIndex + 1}`}
                                />
                            )
                        })}
                    </div>

                    <Text as="p" variant="caption" className={carouselTheme.hint()}>
                        Swipe left or right to browse.
                    </Text>

                    <div className={carouselTheme.actions()}>
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