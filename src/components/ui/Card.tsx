import type { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import { Badge } from './Badge'
import { Text, type TextProps } from './Text'

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

export type CardTitleProps = Omit<TextProps, 'as' | 'variant'> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4'
    variant?: 'title' | 'heading' | 'subheading'
    children: ReactNode
    className?: string
}

export type CardDescriptionProps = Omit<TextProps, 'as' | 'variant'> & {
    as?: 'p' | 'span' | 'div'
    variant?: 'body' | 'muted' | 'caption'
    children: ReactNode
    className?: string
}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {
    children?: CardHeaderChild | CardHeaderChild[]
}

export type CardBodyProps = HTMLAttributes<HTMLDivElement> & {
    children?: ReactNode
}

export type CardFooterProps = HTMLAttributes<HTMLDivElement> & {
    children?: ReactNode
}

type CardHeaderChild =
    | ReactElement<CardTitleProps, typeof CardTitle>
    | ReactElement<CardDescriptionProps, typeof CardDescription>
    | ReactElement<{ children: ReactNode; className?: string }, typeof Badge>

type CardChild =
    | ReactElement<CardHeaderProps, typeof CardHeader>
    | ReactElement<CardBodyProps, typeof CardBody>
    | ReactElement<CardFooterProps, typeof CardFooter>

export type CardProps = HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof cardVariants> & {
        children?: CardChild | CardChild[]
    }

function CardRoot({ variant, padding, className, children, ...props }: CardProps) {
    return (
        <div className={cn(cardVariants({ variant, padding }), className)} {...props}>
            {children}
        </div>
    )
}

function CardHeader({ className, children, ...props }: CardHeaderProps) {
    return (
        <div className={cn('flex flex-col gap-2', className)} {...props}>
            {children}
        </div>
    )
}

function CardTitle({ children, className, as = 'h2', variant = 'heading' }: CardTitleProps) {
    return (
        <Text as={as} variant={variant} className={cn('text-slate-950', className)}>
            {children}
        </Text>
    )
}

function CardDescription({ children, className, as = 'p', variant = 'body' }: CardDescriptionProps) {
    return (
        <Text as={as} variant={variant} className={cn(className)}>
            {children}
        </Text>
    )
}

function CardBody({ className, children, ...props }: CardBodyProps) {
    return (
        <div className={cn('min-h-0', className)} {...props}>
            {children}
        </div>
    )
}

function CardFooter({ className, children, ...props }: CardFooterProps) {
    return (
        <div className={cn('pt-4', className)} {...props}>
            {children}
        </div>
    )
}

export const Card = Object.assign(CardRoot, {
    Header: CardHeader,
    Title: CardTitle,
    Description: CardDescription,
    Body: CardBody,
    Footer: CardFooter,
})

export { CardBody, CardDescription, CardFooter, CardHeader, CardTitle }
