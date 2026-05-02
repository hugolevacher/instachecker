export const resultsPanelTheme = {
    root: 'space-y-4 sm:p-5',
    tabs: 'grid grid-cols-3 gap-2',
    tabButton: 'rounded-2xl border px-3 py-3 text-left transition active:scale-[0.98]',
    tabButtonActive: 'border-[#e1306c] bg-[#e1306c] text-white shadow-lg shadow-pink-500/20',
    tabButtonIdle: 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900',
    body: 'mt-4',
    tabLabelMobile: 'block text-[10px] font-semibold uppercase tracking-[0.12em] opacity-80 sm:hidden',
    tabLabelDesktop: 'hidden text-xs font-semibold uppercase tracking-[0.25em] opacity-80 sm:block',
    tabCount: 'mt-1 block text-base font-semibold sm:text-lg',
    placeholder: 'rounded-4xl border border-dashed border-slate-200 bg-white/80 p-8 text-center shadow-sm',
} as const