import { cva } from 'class-variance-authority'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'none' | 'sm' | 'md' | 'lg'

export const buttonTheme = cva(
    'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1306c] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
    {
        variants: {
            variant: {
                primary: 'bg-gradient-to-r from-[#f77737] via-[#e1306c] to-[#c13584] text-white shadow-lg shadow-pink-500/20 hover:brightness-105',
                secondary: 'border border-slate-200 bg-white/80 text-slate-900 shadow-sm hover:border-slate-300 hover:bg-white',
                ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
            },
            size: {
                none: 'p-0 text-xs',
                sm: 'px-3 py-2 text-xs',
                md: 'px-4 py-3 text-sm',
                lg: 'px-5 py-3 text-base',
            },
        },
        defaultVariants: {
            variant: 'secondary',
            size: 'md',
        },
    },
)