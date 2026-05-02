import { useEffect, type ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { Button } from './Button'
import { Text } from './ui/Text'

type ModalProps = {
    open: boolean
    title: string
    onClose: () => void
    children: ReactNode
    size?: 'responsive' | 'wide'
}

const modalShellVariants = cva(
    'relative z-10 w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-2xl shadow-slate-900/20',
    {
        variants: {
            size: {
                responsive: 'max-w-[calc(100vw-2rem)] sm:max-w-[52rem] lg:w-fit lg:max-w-none',
                wide: 'max-w-[calc(100vw-2rem)] sm:max-w-[64rem]',
            },
        },
        defaultVariants: {
            size: 'responsive',
        },
    },
)

export function Modal({ open, title, onClose, children, size = 'responsive' }: ModalProps) {
    useEffect(() => {
        if (!open) {
            return
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose, open])

    if (!open) {
        return null
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
            <Button
                type="button"
                variant="ghost"
                size="none"
                className="absolute inset-0 rounded-none bg-transparent p-0 shadow-none hover:bg-transparent"
                aria-label="Close guide"
                onClick={onClose}
            />
            <div className={modalShellVariants({ size })}>
                <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2 sm:px-6 sm:py-4">
                    <div>
                        <Text as="p" variant="overline" className="text-slate-400">
                            Guide
                        </Text>
                        <Text as="h2" variant="subheading" className="mt-1 hidden sm:block">
                            {title}
                        </Text>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        Close
                    </Button>
                </div>
                <div className="px-4 py-4 sm:px-14 sm:py-10">{children}</div>
            </div>
        </div>
    )
}