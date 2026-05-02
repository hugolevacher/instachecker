import type { HTMLAttributes, PropsWithChildren } from 'react'
import { textTheme, type TextVariant } from '../../theme/primitives/text'
import { cn } from '../../lib/cn'

type TextAs = 'p' | 'span' | 'div' | 'label' | 'h1' | 'h2' | 'h3' | 'h4'

export type TextProps = PropsWithChildren<
    HTMLAttributes<HTMLElement> & {
        as?: TextAs
        variant?: TextVariant
    }
>

export function Text({ as: Component = 'p', variant, className, children, ...props }: TextProps) {
    return (
        <Component className={cn(textTheme({ variant }), className)} {...props}>
            {children}
        </Component>
    )
}
