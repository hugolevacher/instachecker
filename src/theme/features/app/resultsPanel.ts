import { tv } from 'tailwind-variants'

export const resultsPanelTheme = tv({
    slots: {
        root: 'space-y-4 p-4 sm:p-8',
        tabs: 'grid grid-cols-3 gap-2',
        tabButton:
            'flex min-h-11 flex-col items-start gap-0.5 rounded-xl border px-3 py-2.5 text-left transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1306c] focus-visible:ring-offset-2',
        tabCount: 'tabular text-xl font-bold leading-none sm:text-2xl',
        tabLabel: 'text-[0.7rem] font-semibold leading-4 sm:text-xs',
        hintRow: 'mt-2.5 flex items-baseline justify-between gap-3',
        tabHint: 'text-xs leading-5 text-[#8b8394]',
        tabTotal: 'tabular shrink-0 text-xs font-semibold text-[#8b8394]',
        body: 'mt-4',
        empty: 'space-y-3',
        placeholder: 'text-sm leading-6 text-[#8b8394]',
        // Shows what the three buckets mean before any data exists.
        previewList: 'divide-y divide-[#f1eff3] border-t border-[#f1eff3]',
        previewItem: 'flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-baseline sm:gap-3',
        previewLabel: 'text-sm font-semibold text-[#4a4453] sm:w-40 sm:shrink-0',
        previewHint: 'text-xs leading-5 text-[#8b8394]',
    },
    variants: {
        active: {
            true: { tabButton: 'border-[#e1306c] bg-[#e1306c] text-white shadow-sm' },
            false: {
                tabButton: 'border-[#e9e6ec] bg-white text-[#6b6474] hover:border-[#d9d5de] hover:text-[#1a1620]',
            },
        },
    },
    defaultVariants: {
        active: false,
    },
})