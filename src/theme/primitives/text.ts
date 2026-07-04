import { tv, type VariantProps } from 'tailwind-variants'

export const textTheme = tv({
    base: '',
    variants: {
        variant: {
            eyebrow: 'text-xs font-semibold uppercase tracking-[0.35em] text-[#e1306c]',
            overline: 'text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#e1306c]',
            title: 'text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl',
            heading: 'text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl',
            subheading: 'text-lg font-semibold text-slate-900',
            body: 'text-base leading-7 text-slate-600',
            muted: 'text-sm leading-6 text-slate-500',
            caption: 'text-xs font-medium leading-5 text-slate-500',
            label: 'text-xs font-semibold uppercase tracking-[0.28em] text-[#e1306c]',
        },
    },
    defaultVariants: {
        variant: 'body',
    },
})

export type TextVariant = VariantProps<typeof textTheme>['variant']