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
    onPrevious: () => void
    onNext: () => void
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
    onPrevious,
    onNext,
    onJump,
    onTransitionEnd,
}: OnboardingCarouselProps) {
    const current = slides[baseIndex]
    const overlay = overlayIndex !== null ? slides[overlayIndex] : null

    return (
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="mx-auto w-full max-w-[19rem]">
                <div className="relative mx-auto aspect-[1059/2235] w-full overflow-hidden rounded-[2.5rem] border-[10px] border-slate-950 bg-slate-950 shadow-[0_30px_90px_rgba(15,23,42,0.22)]">
                    <div className="absolute left-1/2 top-0 z-20 h-4 w-32 -translate-x-1/2 rounded-b-[1.25rem] bg-slate-950" />
                    <div className="absolute left-1/2 top-2 z-30 h-1.5 w-14 -translate-x-1/2 rounded-full bg-white/25" />
                    <div className="absolute right-[-13px] top-20 z-10 h-10 w-1.5 rounded-r-full bg-slate-900" />
                    <div className="absolute right-[-13px] top-32 z-10 h-16 w-1.5 rounded-r-full bg-slate-900" />
                    <div className="absolute left-[-13px] top-24 z-10 h-8 w-1.5 rounded-l-full bg-slate-900" />

                    <img src={current.imageSrc} alt={current.title} className="absolute inset-0 h-full w-full object-cover" />
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
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(225,48,108,0.08),transparent_45%),linear-gradient(180deg,rgba(15,23,42,0.05),transparent_30%)]" />
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>

            <div className="space-y-5">
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e1306c]">
                        Step {baseIndex + 1} of {slides.length}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-950">{current.title}</h3>
                    <p className="text-sm leading-6 text-slate-600">{current.description}</p>
                </div>

                <div className="flex items-center gap-2">
                    {slides.map((slide, slideIndex) => (
                        <button
                            key={slide.title}
                            type="button"
                            onClick={() => onJump(slideIndex)}
                            className={`h-2.5 rounded-full transition-all ${slideIndex === baseIndex ? 'w-8 bg-[#e1306c]' : 'w-2.5 bg-slate-200'
                                }`}
                            aria-label={`Go to slide ${slideIndex + 1}`}
                        />
                    ))}
                </div>

                <div className="flex flex-wrap gap-3">
                    <Button onClick={onPrevious}>Previous</Button>
                    <Button variant="primary" onClick={onNext}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}