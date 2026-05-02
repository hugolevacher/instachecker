import type { HTMLAttributes, PropsWithChildren } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/cn'

type TextVariant = 'eyebrow' | 'overline' | 'title' | 'heading' | 'subheading' | 'body' | 'muted' | 'caption' | 'label'

const textVariants = cva('', {
    variants: {
        variant: {
            eyebrow: 'text-xs font-semibold uppercase tracking-[0.35em] text-[#e1306c]',
            overline: 'text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#e1306c]',
            title: 'text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl',
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

type TextAs = 'p' | 'span' | 'div' | 'label' | 'h1' | 'h2' | 'h3' | 'h4'

export type TextProps = PropsWithChildren<
    HTMLAttributes<HTMLElement> & {
        as?: TextAs
        variant?: TextVariant
    }
>

export function Text({ as: Component = 'p', variant, className, children, ...props }: TextProps) {
    return (
        <Component className={cn(textVariants({ variant }), className)} {...props}>
            {children}
        </Component>
    )
}
