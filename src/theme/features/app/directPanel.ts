import { tv } from 'tailwind-variants'

export const directPanelTheme = tv({
    slots: {
        modeSwitchGroup: 'space-y-2',
        modeSwitchLabel: 'text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#8b8394]',
        modeSwitch: 'flex flex-col gap-2',

        // Each method is an accordion row: header always visible, steps only when chosen.
        // Keeps the unchosen branch out of the DOM so mobile stays short.
        modeItem: 'overflow-hidden rounded-2xl border transition duration-200',
        modeButton:
            'flex w-full items-center gap-3 px-3 py-3 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#e1306c]',
        modeMarker:
            'flex h-6 w-6 shrink-0 items-center justify-center self-start rounded-full border-2 transition duration-200',
        modeText: 'min-w-0 flex-1',
        modeLabelRow: 'flex flex-wrap items-center gap-x-2 gap-y-1',
        modeLabel: 'text-sm font-semibold',
        modeBadge: 'rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide',
        modeDetail: 'mt-0.5 text-xs leading-5',
        modeBody: 'border-t border-[#efedf1] px-3 pb-3 pt-3',

        root: 'flex flex-col gap-3',
        stepRow: 'flex gap-3',
        stepNumber:
            'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f3f0f5] text-[0.7rem] font-bold text-[#6b6474]',
        stepContent: 'min-w-0 flex-1 space-y-2',
        stepTitle: 'text-sm font-semibold text-[#1a1620]',
        description: 'text-sm leading-6 text-[#6b6474]',
        setupButton: 'w-full',

        pasteBlock: 'space-y-2',
        pasteLabel: 'block text-sm font-semibold text-[#1a1620]',
        pasteInput:
            'h-24 w-full resize-none rounded-xl border border-[#e4e1e8] bg-white px-3 py-2.5 text-base leading-6 text-[#1a1620] outline-none transition focus:border-[#e1306c] focus:ring-2 focus:ring-[#e1306c]/20 placeholder:text-[#a49dad] sm:text-sm',
        analyzeButton: 'w-full',
    },
    variants: {
        active: {
            true: {
                modeItem: 'border-[#e1306c] bg-white shadow-[0_1px_2px_rgba(26,22,32,0.04)]',
                modeMarker: 'border-[#e1306c] bg-[#e1306c] text-white',
                modeLabel: 'text-[#1a1620]',
                modeBadge: 'bg-[#e1306c]/10 text-[#b11f54]',
                modeDetail: 'text-[#6b6474]',
            },
            false: {
                modeItem: 'border-[#e9e6ec] bg-[#f7f5f8] hover:border-[#d9d5de]',
                modeMarker: 'border-[#ddd8e2] bg-white text-[#8b8394]',
                modeLabel: 'text-[#4a4453]',
                modeBadge: 'bg-[#eceaef] text-[#7a7285]',
                modeDetail: 'text-[#8b8394]',
            },
        },
    },
    defaultVariants: {
        active: false,
    },
})

export const bookmarkletGuideTheme = tv({
    slots: {
        root: 'space-y-4',
        intro: 'text-sm leading-6 text-[#6b6474]',
        browserNote:
            'flex items-start gap-2 rounded-xl border border-amber-200/80 bg-amber-50 px-3 py-2.5 text-sm leading-6 text-[#8a5a09]',
        tabs: 'flex gap-1 rounded-xl border border-[#e9e6ec] bg-[#f7f5f8] p-1',
        tab: 'min-h-10 flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1306c] focus-visible:ring-offset-2',
        stepBlock: 'space-y-2.5',
        stepTitle: 'text-[#1a1620]',
        stepList: 'ml-5 list-decimal space-y-1.5 text-sm leading-6 text-[#6b6474] marker:font-semibold marker:text-[#e1306c]',
        controls: 'flex flex-col gap-2 sm:flex-row',
        dragPill:
            'inline-flex min-h-11 cursor-grab items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#e1306c]/50 bg-[#e1306c]/[0.06] px-4 py-3 text-sm font-semibold text-[#b11f54] transition hover:border-[#e1306c] hover:bg-[#e1306c]/10 active:cursor-grabbing',
        copyButton: 'sm:w-auto',
        doneRow: 'flex justify-end pt-1',
    },
    variants: {
        active: {
            true: { tab: 'bg-white text-[#1a1620] shadow-[0_1px_2px_rgba(26,22,32,0.06)]' },
            false: { tab: 'text-[#8b8394] hover:text-[#1a1620]' },
        },
    },
    defaultVariants: {
        active: false,
    },
})
