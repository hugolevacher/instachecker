import type { HTMLAttributes, PropsWithChildren } from 'react'
import { type VariantProps } from 'tailwind-variants'
import { badgeTheme } from '../../theme/primitives/badge'
import { cn } from '../../lib/cn'

export type BadgeProps = PropsWithChildren<
    HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeTheme>
>

export function Badge({ variant, className, children, ...props }: BadgeProps) {
    const classes = badgeTheme({ variant })

    return (
        <span className={cn(classes, className)} {...props}>
            {children}
        </span>
    )
}
