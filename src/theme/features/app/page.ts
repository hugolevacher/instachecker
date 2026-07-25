import { tv } from 'tailwind-variants'

export const appPageTheme = tv({
    slots: {
        root: 'relative min-h-screen overflow-hidden text-[#4a4453]',
        // Single soft wash at the top only — the page is a tool, not a landing page.
        background:
            'pointer-events-none fixed inset-0 z-0 bg-[#fbfafb] bg-[radial-gradient(80rem_32rem_at_50%_-12rem,rgba(225,48,108,0.10),transparent_70%)]',
        dragOverlay: 'pointer-events-none fixed inset-2 z-50 rounded-2xl border-2 border-dashed border-[#e1306c]/70 bg-[#e1306c]/[0.04] transition-opacity duration-200',
        container: 'relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-10 pt-5 sm:px-6 sm:pt-6 lg:px-8',
        main: 'mt-5 grid flex-1 gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start',
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