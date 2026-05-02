import { cva } from 'class-variance-authority'

export const cardTheme = {
    root: cva('backdrop-blur', {
        variants: {
            variant: {
                default: 'rounded-[2.25rem] border border-white/80 bg-white/75 shadow-[0_24px_80px_rgba(15,23,42,0.08)]',
                subtle: 'rounded-4xl border border-slate-200/80 bg-white/80 shadow-sm',
                dashed: 'rounded-4xl border-[3px] border-dotted border-slate-300/90 bg-white/80 shadow-sm',
                elevated: 'rounded-[2.5rem] border border-white/90 bg-white/90 shadow-[0_30px_100px_rgba(15,23,42,0.12)]',
            },
            padding: {
                none: '',
                sm: 'p-4',
                md: 'p-6',
                lg: 'p-8',
            },
        },
        defaultVariants: {
            variant: 'default',
            padding: 'none',
        },
    }),
    header: 'flex flex-col gap-2',
    title: 'text-slate-950',
    description: '',
    body: 'min-h-0',
    footer: 'pt-4',
} as const