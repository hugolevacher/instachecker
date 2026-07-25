import { tv, type VariantProps } from 'tailwind-variants'

export const modalTheme = tv({
    slots: {
        backdrop: 'fixed inset-0 z-50 flex items-center justify-center bg-[#1a1620]/50 px-4 py-6 backdrop-blur-sm',
        // Cap to the viewport and scroll the body — long guides must never push
        // their footer button off-screen with no way to reach it.
        shell: 'relative z-10 flex max-h-full w-full flex-col overflow-hidden rounded-2xl border border-[#eae7ee] bg-white shadow-[0_24px_64px_-16px_rgba(26,22,32,0.35)]',
        closeOverlay: 'absolute inset-0 rounded-none bg-transparent p-0 shadow-none hover:bg-transparent',
        header: 'flex shrink-0 items-center justify-between border-b border-[#f1eff3] px-4 py-3 sm:px-6 sm:py-4',
        titleGroup: 'flex flex-col',
        overline: 'text-[#a49dad]',
        title: 'mt-0.5 hidden sm:block',
        body: 'min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-10 sm:py-8',
    },
    variants: {
        size: {
            responsive: { shell: 'max-w-[calc(100vw-2rem)] sm:max-w-[52rem] lg:w-fit lg:max-w-none' },
            wide: { shell: 'max-w-[calc(100vw-2rem)] sm:max-w-[64rem]' },
            narrow: { shell: 'max-w-[calc(100vw-2rem)] sm:max-w-[30rem]' },
        },
    },
    defaultVariants: {
        size: 'responsive',
    },
})

export type ModalSize = VariantProps<typeof modalTheme>['size']