import type { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { type VariantProps } from 'tailwind-variants'
import { cn } from '../../lib/cn'
import { Badge } from './Badge'
import { Text, type TextProps } from './Text'
import { cardTheme } from '../../theme/primitives/card'

type CardTitleProps = Omit<TextProps, 'as' | 'variant'> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4'
    variant?: 'title' | 'heading' | 'subheading'
    children: ReactNode
    className?: string
}

type CardDescriptionProps = Omit<TextProps, 'as' | 'variant'> & {
    as?: 'p' | 'span' | 'div'
    variant?: 'body' | 'muted' | 'caption'
    children: ReactNode
    className?: string
}

type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {
    children?: CardHeaderChild | CardHeaderChild[]
}

type CardBodyProps = HTMLAttributes<HTMLDivElement> & {
    children?: ReactNode
}

type CardFooterProps = HTMLAttributes<HTMLDivElement> & {
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

type CardProps = HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof cardTheme> & {
        children?: CardChild | CardChild[]
    }

type CardCompound = ((props: CardProps) => ReactElement) & {
    Header: typeof CardHeader
    Title: typeof CardTitle
    Description: typeof CardDescription
    Body: typeof CardBody
    Footer: typeof CardFooter
}

function CardRoot({ variant, padding, className, children, ...props }: CardProps) {
    const classes = cardTheme({ variant, padding })

    return (
        <div className={cn(classes.root(), className)} {...props}>
            {children}
        </div>
    )
}

function CardHeader({ className, children, ...props }: CardHeaderProps) {
    const classes = cardTheme()

    return (
        <div className={cn(classes.header(), className)} {...props}>
            {children}
        </div>
    )
}

function CardTitle({ children, className, as = 'h2', variant = 'heading' }: CardTitleProps) {
    const classes = cardTheme()

    return (
        <Text as={as} variant={variant} className={cn(classes.title(), className)}>
            {children}
        </Text>
    )
}

function CardDescription({ children, className, as = 'p', variant = 'body' }: CardDescriptionProps) {
    const classes = cardTheme()

    return (
        <Text as={as} variant={variant} className={cn(classes.description(), className)}>
            {children}
        </Text>
    )
}

function CardBody({ className, children, ...props }: CardBodyProps) {
    const classes = cardTheme()

    return (
        <div className={cn(classes.body(), className)} {...props}>
            {children}
        </div>
    )
}

function CardFooter({ className, children, ...props }: CardFooterProps) {
    const classes = cardTheme()

    return (
        <div className={cn(classes.footer(), className)} {...props}>
            {children}
        </div>
    )
}

export const Card = ((props: CardProps) => {
    return <CardRoot {...props} />
}) as CardCompound

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Body = CardBody
Card.Footer = CardFooter
