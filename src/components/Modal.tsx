import { useEffect, type ReactNode } from 'react'
import { Button } from './Button'

type ModalProps = {
    open: boolean
    title: string
    onClose: () => void
    children: ReactNode
}

export function Modal({ open, title, onClose, children }: ModalProps) {
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
            <button
                type="button"
                className="absolute inset-0"
                aria-label="Close guide"
                onClick={onClose}
            />
            <div className="relative z-10 w-fit max-w-[calc(100vw-2rem)] overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-2xl shadow-slate-900/20">
                <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2 sm:px-6 sm:py-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                            Guide
                        </p>
                        <h2 className="mt-1 hidden text-lg font-semibold text-slate-900 sm:block">{title}</h2>
                    </div>
                    <Button variant="ghost" onClick={onClose} className="px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm">
                        Close
                    </Button>
                </div>
                <div className="px-4 py-4 sm:px-14 sm:py-10">{children}</div>
            </div>
        </div>
    )
}