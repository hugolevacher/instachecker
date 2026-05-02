import type { HTMLAttributes, PropsWithChildren } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const cardVariants = cva('backdrop-blur', {
    variants: {
        variant: {
            default: 'rounded-[2.25rem] border border-white/80 bg-white/75 shadow-[0_24px_80px_rgba(15,23,42,0.08)]',
            subtle: 'rounded-4xl border border-slate-200/80 bg-white/80 shadow-sm',
            dashed: 'rounded-4xl border border-dashed border-slate-200 bg-white/80 shadow-sm',
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
})

export type CardProps = PropsWithChildren<
    HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>
>

export function Card({ variant, padding, className, children, ...props }: CardProps) {
    return (
        <div className={cn(cardVariants({ variant, padding }), className)} {...props}>
            {children}
        </div>
    )
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('flex flex-col gap-2', className)} {...props} />
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('min-h-0', className)} {...props} />
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('pt-4', className)} {...props} />
}
