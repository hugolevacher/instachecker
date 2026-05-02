import { cva } from 'class-variance-authority'

export const modalTheme = {
    shell: cva(
        'relative z-10 w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-2xl shadow-slate-900/20',
        {
            variants: {
                size: {
                    responsive: 'max-w-[calc(100vw-2rem)] sm:max-w-[52rem] lg:w-fit lg:max-w-none',
                    wide: 'max-w-[calc(100vw-2rem)] sm:max-w-[64rem]',
                },
            },
            defaultVariants: {
                size: 'responsive',
            },
        },
    ),
    backdrop: 'fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm',
    closeOverlay: 'absolute inset-0 rounded-none bg-transparent p-0 shadow-none hover:bg-transparent',
    header: 'flex items-center justify-between border-b border-slate-100 px-3 py-2 sm:px-6 sm:py-4',
    titleGroup: 'flex flex-col',
    overline: 'text-slate-400',
    title: 'mt-1 hidden sm:block',
    body: 'px-4 py-4 sm:px-14 sm:py-10',
} as const