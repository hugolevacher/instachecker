import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { buttonTheme, type ButtonSize, type ButtonVariant } from '../theme/primitives/button'
import { cn } from '../lib/cn'

type ButtonProps = PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: ButtonVariant
        size?: ButtonSize
    }
>


export function Button({ className, variant, size, children, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={cn(
                buttonTheme({ variant, size }),
                className,
            )}
        >
            {children}
        </button>
    )
}