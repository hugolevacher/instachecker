import type { HTMLAttributes, PropsWithChildren } from 'react'
import { type VariantProps } from 'class-variance-authority'
import { badgeTheme } from '../../theme/primitives/badge'
import { cn } from '../../lib/cn'

export type BadgeProps = PropsWithChildren<
    HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeTheme>
>

export function Badge({ variant, className, children, ...props }: BadgeProps) {
    return (
        <span className={cn(badgeTheme({ variant }), className)} {...props}>
            {children}
        </span>
    )
}
