import { Button } from './Button'

export type Slide = {
    title: string
    description: string
    accent: string
}

type OnboardingCarouselProps = {
    slides: Slide[]
    index: number
    onPrevious: () => void
    onNext: () => void
    onJump: (index: number) => void
}

export function OnboardingCarousel({ slides, index, onPrevious, onNext, onJump }: OnboardingCarouselProps) {
    const current = slides[index]

    return (
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="rounded-[1.75rem] border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-4 sm:p-5">
                <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className={`h-full rounded-[1.25rem] bg-gradient-to-br ${current.accent} p-5 text-white`}>
                        <div className="flex h-full flex-col justify-between rounded-[1rem] border border-white/25 bg-white/10 p-4 backdrop-blur-sm">
                            <div className="space-y-2">
                                <div className="h-2 w-16 rounded-full bg-white/70" />
                                <div className="h-2 w-28 rounded-full bg-white/50" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="h-24 rounded-2xl bg-white/25" />
                                <div className="h-24 rounded-2xl bg-white/15" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-5">
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e1306c]">
                        Step {index + 1} of {slides.length}
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
                            className={`h-2.5 rounded-full transition-all ${slideIndex === index ? 'w-8 bg-[#e1306c]' : 'w-2.5 bg-slate-200'
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