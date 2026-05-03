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
            default: { root: 'rounded-[2.25rem] border border-white/80 bg-white/75 shadow-[0_24px_80px_rgba(15,23,42,0.08)]' },
            subtle: { root: 'rounded-4xl border border-slate-200/80 bg-white/80 shadow-sm' },
            dashed: { root: 'rounded-4xl border-[3px] border-dotted border-slate-300/90 bg-white/80 shadow-sm' },
            elevated: { root: 'rounded-[2.5rem] border border-white/90 bg-white/90 shadow-[0_30px_100px_rgba(15,23,42,0.12)]' },
        },
        padding: {
            none: { root: '' },
            sm: { root: 'p-4' },
            md: { root: 'p-6' },
            lg: { root: 'p-8' },
        },
    },
    defaultVariants: {
        variant: 'default',
        padding: 'none',
    },
})

export type CardVariant = VariantProps<typeof cardTheme>['variant']
export type CardPadding = VariantProps<typeof cardTheme>['padding']