import { tv, type VariantProps } from 'tailwind-variants'

export const textTheme = tv({
    base: '',
    variants: {
        variant: {
            eyebrow: 'text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#8b8394]',
            overline: 'text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#e1306c]',
            title: 'text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#1a1620] sm:text-4xl',
            heading: 'text-xl font-bold tracking-[-0.015em] text-[#1a1620] sm:text-2xl',
            subheading: 'text-base font-semibold text-[#1a1620]',
            body: 'text-base leading-7 text-[#6b6474]',
            muted: 'text-sm leading-6 text-[#8b8394]',
            caption: 'text-xs font-medium leading-5 text-[#8b8394]',
            label: 'text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#8b8394]',
        },
    },
    defaultVariants: {
        variant: 'body',
    },
})

export type TextVariant = VariantProps<typeof textTheme>['variant']