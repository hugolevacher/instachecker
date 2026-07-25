import { tv, type VariantProps } from 'tailwind-variants'

export const buttonTheme = tv({
    base: 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1306c] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    variants: {
        variant: {
            primary: 'bg-[#e1306c] text-white shadow-[0_1px_2px_rgba(26,22,32,0.10)] hover:bg-[#c72a5f]',
            secondary: 'border border-[#ddd8e2] bg-white text-[#1a1620] hover:border-[#c6bfcf] hover:bg-[#faf9fb]',
            ghost: 'text-[#6b6474] hover:bg-[#f3f0f5] hover:text-[#1a1620]',
        },
        size: {
            none: 'min-h-0 p-0 text-xs',
            sm: 'min-h-9 px-3 py-1.5 text-xs',
            md: 'px-4 py-2.5 text-sm',
            lg: 'px-5 py-3 text-base',
        },
    },
    defaultVariants: {
        variant: 'secondary',
        size: 'md',
    },
})

export type ButtonVariant = VariantProps<typeof buttonTheme>['variant']
export type ButtonSize = VariantProps<typeof buttonTheme>['size']