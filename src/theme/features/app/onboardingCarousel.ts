import { tv } from 'tailwind-variants'

export const onboardingCarouselTheme = tv({
    slots: {
        root: 'grid w-full justify-items-center gap-8 px-0 sm:gap-10 lg:grid-cols-[15.25rem_20rem] lg:items-center lg:justify-items-start lg:gap-12',
        phoneColumn: 'w-[12.5rem] shrink-0 sm:w-[13.25rem] lg:w-[15.25rem]',
        phoneFrame: 'relative mx-auto aspect-[1059/2235] w-full overflow-hidden rounded-[1.95rem] border-[7px] border-slate-950 bg-slate-950 shadow-[0_22px_70px_rgba(15,23,42,0.18)]',
        notch: 'absolute left-1/2 top-0 z-20 h-3 w-20 -translate-x-1/2 rounded-b-[0.85rem] bg-slate-950',
        receiver: 'absolute left-1/2 top-2 z-30 h-1.5 w-14 -translate-x-1/2 rounded-full bg-white/25',
        sideTop: 'absolute right-[-10px] top-18 z-10 h-8 w-1.5 rounded-r-full bg-slate-900',
        sideMid: 'absolute right-[-10px] top-28 z-10 h-12 w-1.5 rounded-r-full bg-slate-900',
        sideLeft: 'absolute left-[-10px] top-22 z-10 h-6 w-1.5 rounded-l-full bg-slate-900',
        image: 'absolute inset-0 h-full w-full object-cover',
        shade: 'absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(225,48,108,0.08),transparent_45%),linear-gradient(180deg,rgba(15,23,42,0.05),transparent_30%)]',
        overlay: 'absolute inset-0 z-10 overflow-hidden rounded-[2.5rem]',
        overlayImage: 'h-full w-full object-cover',
        swipeLayer: 'absolute inset-0 z-20 cursor-grab touch-pan-y select-none active:cursor-grabbing',
        contentColumn: 'flex h-full w-full items-center justify-self-center lg:w-[20rem] lg:shrink-0 lg:justify-self-start',
        contentInner: 'flex w-full max-w-full flex-col justify-center gap-4 sm:gap-5 lg:max-w-[20rem]',
        copyBlock: 'min-h-0 space-y-1.5 sm:min-h-[9.5rem] sm:space-y-2 lg:min-h-[10rem]',
        stepLabel: 'sm:text-xs sm:tracking-[0.3em]',
        title: 'text-lg tracking-tight sm:text-2xl',
        description: 'text-xs leading-5 sm:text-sm sm:leading-6',
        dots: 'flex items-center gap-1.5 sm:gap-2',
        dot: 'h-3.5 rounded-full transition-all sm:h-2.5',
        hint: 'tracking-[0.12em] text-slate-400 sm:hidden',
        actions: 'hidden flex-wrap gap-3 pt-1 sm:flex',
    },
    variants: {
        active: {
            true: { dot: 'w-9 bg-[#e1306c] sm:w-8' },
            false: { dot: 'w-3.5 bg-slate-200 sm:w-2.5' },
        },
    },
    defaultVariants: {
        active: false,
    },
})