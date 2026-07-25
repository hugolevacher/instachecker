import { tv } from 'tailwind-variants'

export const onboardingCarouselTheme = tv({
    slots: {
        root: 'grid w-full touch-pan-y select-none justify-items-center gap-5 px-0 sm:gap-10 lg:grid-cols-[15.25rem_20rem] lg:items-center lg:justify-items-start lg:gap-12',
        // Height-capped so the copy and Back/Next stay on screen inside the modal.
        phoneColumn: 'w-[9.5rem] shrink-0 sm:w-[13.25rem] lg:w-[15.25rem]',
        phoneFrame: 'relative mx-auto aspect-[1059/2235] w-full overflow-hidden rounded-[1.95rem] border-[7px] border-[#1a1620] bg-[#1a1620] shadow-[0_18px_48px_-12px_rgba(26,22,32,0.30)]',
        notch: 'absolute left-1/2 top-0 z-20 h-3 w-20 -translate-x-1/2 rounded-b-[0.85rem] bg-[#1a1620]',
        receiver: 'absolute left-1/2 top-2 z-30 h-1.5 w-14 -translate-x-1/2 rounded-full bg-white/25',
        sideTop: 'absolute right-[-10px] top-18 z-10 h-8 w-1.5 rounded-r-full bg-[#2a2433]',
        sideMid: 'absolute right-[-10px] top-28 z-10 h-12 w-1.5 rounded-r-full bg-[#2a2433]',
        sideLeft: 'absolute left-[-10px] top-22 z-10 h-6 w-1.5 rounded-l-full bg-[#2a2433]',
        image: 'absolute inset-0 h-full w-full object-cover',
        contentColumn: 'flex h-full w-full items-center justify-self-center lg:w-[20rem] lg:shrink-0 lg:justify-self-start',
        contentInner: 'flex w-full max-w-full flex-col justify-center gap-4 sm:gap-5 lg:max-w-[20rem]',
        copyBlock: 'min-h-0 space-y-1.5 sm:min-h-[9.5rem] sm:space-y-2 lg:min-h-[10rem]',
        stepLabel: 'sm:text-xs sm:tracking-[0.3em]',
        title: 'text-lg tracking-tight sm:text-2xl',
        description: 'text-xs leading-[1.5] sm:text-sm sm:leading-6',
        dots: 'flex items-center',
        // Padding gives each dot a real tap target without inflating the visual size.
        dotHit: 'flex items-center justify-center px-1.5 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1306c] focus-visible:ring-offset-1 rounded-full',
        dot: 'block h-2.5 rounded-full transition-all',
        hint: 'text-[#a49dad] sm:hidden',
        // Buttons on every size — swipe alone is an invisible affordance.
        actions: 'grid grid-cols-2 gap-2 pt-1 sm:flex sm:flex-wrap sm:gap-3',
        actionButton: 'w-full sm:w-auto sm:px-5',
    },
    variants: {
        active: {
            true: { dot: 'w-8 bg-[#e1306c]' },
            false: { dot: 'w-2.5 bg-[#ddd8e2] hover:bg-[#c6bfcf]' },
        },
    },
    defaultVariants: {
        active: false,
    },
})