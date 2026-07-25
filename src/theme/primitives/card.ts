import { tv, type VariantProps } from 'tailwind-variants'

export const cardTheme = tv({
    slots: {
        root: 'backdrop-blur',
        header: 'flex flex-col gap-2',
        title: 'text-slate-950',
        description: '',
        body: 'min-h-0',
        footer: 'pt-4',
    },
    variants: {
        variant: {
            default: { root: 'rounded-3xl border border-[#eae7ee] bg-white shadow-[0_1px_3px_rgba(26,22,32,0.04),0_12px_32px_-12px_rgba(26,22,32,0.10)]' },
            subtle: { root: 'rounded-2xl border border-[#eae7ee] bg-white shadow-[0_1px_2px_rgba(26,22,32,0.04)]' },
            dashed: { root: 'rounded-xl border-2 border-dashed border-[#ddd8e2] bg-[#fcfbfd]' },
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})

export type CardVariant = VariantProps<typeof cardTheme>['variant']