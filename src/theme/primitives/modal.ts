import { tv, type VariantProps } from 'tailwind-variants'

export const modalTheme = tv({
    slots: {
        backdrop: 'fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm',
        shell: 'relative z-10 w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-2xl shadow-slate-900/20',
        closeOverlay: 'absolute inset-0 rounded-none bg-transparent p-0 shadow-none hover:bg-transparent',
        header: 'flex items-center justify-between border-b border-slate-100 px-3 py-2 sm:px-6 sm:py-4',
        titleGroup: 'flex flex-col',
        overline: 'text-slate-400',
        title: 'mt-1 hidden sm:block',
        body: 'px-4 py-4 sm:px-14 sm:py-10',
    },
    variants: {
        size: {
            responsive: { shell: 'max-w-[calc(100vw-2rem)] sm:max-w-[52rem] lg:w-fit lg:max-w-none' },
            wide: { shell: 'max-w-[calc(100vw-2rem)] sm:max-w-[64rem]' },
        },
    },
    defaultVariants: {
        size: 'responsive',
    },
})

export type ModalSize = VariantProps<typeof modalTheme>['size']