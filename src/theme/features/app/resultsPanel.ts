import { tv } from 'tailwind-variants'

export const resultsPanelTheme = tv({
    slots: {
        root: 'space-y-4 p-5 sm:p-8',
        tabs: 'grid grid-cols-3 gap-2',
        tabButton: 'rounded-2xl border px-3 py-3 text-left transition active:scale-[0.98]',
        tabLabelMobile: 'block text-[10px] font-semibold uppercase tracking-[0.12em] opacity-80 sm:hidden',
        tabLabelDesktop: 'hidden text-xs font-semibold uppercase tracking-[0.25em] opacity-80 sm:block',
        tabCount: 'mt-1 block text-base font-semibold sm:text-lg',
        body: 'mt-4',
        placeholder: 'text-center text-sm leading-7 text-slate-500',
    },
    variants: {
        active: {
            true: { tabButton: 'border-[#e1306c] bg-[#e1306c] text-white shadow-lg shadow-pink-500/20' },
            false: { tabButton: 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900' },
        },
    },
    defaultVariants: {
        active: false,
    },
})