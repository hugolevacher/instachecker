import { tv } from 'tailwind-variants'

export const directPanelTheme = tv({
    slots: {
        modeSwitchGroup: 'space-y-2',
        modeSwitchLabel: 'text-xs font-semibold uppercase tracking-[0.2em] text-slate-500',
        modeSwitch: 'flex gap-1 rounded-2xl border border-slate-200/80 bg-slate-100/70 p-1',
        modeButton: 'flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1306c] focus-visible:ring-offset-2',
        modeLabelMobile: 'sm:hidden',
        modeLabelDesktop: 'hidden sm:inline',

        root: 'flex flex-col gap-4',
        description: 'text-slate-600',
        setupButton: 'w-full',

        pasteBlock: 'space-y-2',
        pasteLabel: 'text-xs font-semibold uppercase tracking-wide text-slate-500',
        pasteInput: 'h-28 w-full resize-none rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-800 shadow-inner outline-none transition focus:border-[#e1306c] focus:ring-2 focus:ring-[#e1306c]/30 placeholder:text-slate-400',
        analyzeButton: 'w-full',
    },
    variants: {
        active: {
            true: { modeButton: 'bg-white text-slate-900 shadow-sm' },
            false: { modeButton: 'text-slate-500 hover:text-slate-800' },
        },
    },
    defaultVariants: {
        active: false,
    },
})

export const bookmarkletGuideTheme = tv({
    slots: {
        root: 'space-y-5',
        intro: 'text-slate-600',
        tabs: 'flex gap-1 rounded-2xl border border-slate-200/80 bg-slate-100/70 p-1',
        tab: 'flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1306c] focus-visible:ring-offset-2',
        stepBlock: 'space-y-3',
        stepTitle: 'text-slate-900',
        stepList: 'ml-5 list-decimal space-y-1.5 text-sm text-slate-600 marker:font-semibold marker:text-[#e1306c]',
        controls: 'flex flex-col gap-2 sm:flex-row',
        dragPill: 'inline-flex cursor-grab items-center justify-center rounded-2xl border border-dashed border-[#e1306c]/60 bg-[#e1306c]/5 px-4 py-3 text-sm font-semibold text-[#b11f54] transition hover:bg-[#e1306c]/10 active:cursor-grabbing',
        copyButton: 'sm:w-auto',
        doneRow: 'flex justify-end pt-1',
    },
    variants: {
        active: {
            true: { tab: 'bg-white text-slate-900 shadow-sm' },
            false: { tab: 'text-slate-500 hover:text-slate-800' },
        },
    },
    defaultVariants: {
        active: false,
    },
})
