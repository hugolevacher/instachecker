import { tv } from 'tailwind-variants'

export const appPageTheme = tv({
    slots: {
        root: 'relative min-h-screen overflow-hidden text-slate-700',
        background:
            'pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(225,48,108,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(247,119,55,0.12),transparent_28%),linear-gradient(180deg,#fff7fb_0%,#ffffff_74%,#f8fafc_100%)] bg-fixed',
        dragOverlay: 'pointer-events-none fixed inset-1 z-50 rounded-3xl border-4 border-dashed border-[#e1306c]/80 transition-opacity duration-200 sm:inset-3 sm:rounded-4xl',
        container: 'relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-8 pt-6 sm:px-6 lg:px-8',
        main: 'mt-8 grid flex-1 gap-6 lg:mt-10 lg:grid-cols-[1fr_1.1fr] lg:items-start',
        resultsSection: 'space-y-4 lg:pt-1',
        fileInput: 'hidden',
    },
    variants: {
        dragging: {
            true: { dragOverlay: 'opacity-100' },
            false: { dragOverlay: 'opacity-0' },
        },
    },
    defaultVariants: {
        dragging: false,
    },
})