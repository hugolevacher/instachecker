import { tv } from 'tailwind-variants'

export const resultsPanelTheme = tv({
    slots: {
        root: 'space-y-4 p-5 sm:p-8',
        tabs: 'grid grid-cols-1 gap-2 sm:grid-cols-3',
        tabButton: 'flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition active:scale-[0.98]',
        tabLabelMobile: 'block text-sm font-semibold sm:hidden',
        tabLabelDesktop: 'hidden text-sm font-semibold opacity-80 sm:block',
        tabCount: 'ml-auto block text-base font-semibold sm:mt-1 sm:ml-0 sm:text-lg',
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