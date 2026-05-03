import { tv, type VariantProps } from 'tailwind-variants'

export const badgeTheme = tv({
    base: 'inline-flex w-fit self-start items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em]',
    variants: {
        variant: {
            default: 'border-[#e1306c]/15 bg-[#e1306c]/5 text-[#e1306c]',
            muted: 'border-slate-200 bg-white/80 text-slate-500',
            accent: 'border-[#e1306c]/20 bg-[#e1306c]/10 text-[#b11f54]',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})

export type BadgeVariant = VariantProps<typeof badgeTheme>['variant']