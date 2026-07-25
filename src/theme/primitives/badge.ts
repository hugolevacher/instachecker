import { tv, type VariantProps } from 'tailwind-variants'

export const badgeTheme = tv({
    base: 'inline-flex w-fit self-start items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.02em]',
    variants: {
        variant: {
            default: 'border-[#e1306c]/20 bg-[#e1306c]/[0.07] text-[#b11f54]',
            muted: 'border-[#e9e6ec] bg-white text-[#6b6474]',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})

export type BadgeVariant = VariantProps<typeof badgeTheme>['variant']