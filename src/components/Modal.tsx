import { createContext, useContext, useEffect, type ReactElement, type ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { Text } from './ui/Text'

type ModalProps = {
    open: boolean
    onClose: () => void
    children?: ModalChild | ModalChild[]
    size?: 'responsive' | 'wide'
}

type ModalTitleGroupProps = {
    children?: ModalTitleGroupChild | ModalTitleGroupChild[]
    className?: string
}

type ModalOverlineProps = {
    children: ReactNode
    className?: string
}

type ModalTitleProps = {
    children: ReactNode
    className?: string
}

type ModalHeaderProps = {
    children?: ModalHeaderChild | ModalHeaderChild[]
    className?: string
}

type ModalCloseProps = {
    children?: ReactNode
    className?: string
}

type ModalBodyProps = {
    children?: ReactNode
    className?: string
}

type ModalCompound = ((props: ModalProps) => ReactElement | null) & {
    Header: typeof ModalHeader
    TitleGroup: typeof ModalTitleGroup
    Overline: typeof ModalOverline
    Title: typeof ModalTitle
    Close: typeof ModalClose
    Body: typeof ModalBody
}

type ModalTitleGroupChild =
    | ReactElement<ModalOverlineProps, typeof ModalOverline>
    | ReactElement<ModalTitleProps, typeof ModalTitle>

type ModalHeaderChild =
    | ReactElement<ModalTitleGroupProps, typeof ModalTitleGroup>
    | ReactElement<ModalCloseProps, typeof ModalClose>

type ModalChild =
    | ReactElement<ModalHeaderProps, typeof ModalHeader>
    | ReactElement<ModalBodyProps, typeof ModalBody>

type ModalContextValue = {
    onClose: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

function useModalContext() {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('Modal compound components must be used inside <Modal>.')
    }

    return context
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

function ModalRoot({ open, onClose, children, size = 'responsive' }: ModalProps) {
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
        <ModalContext.Provider value={{ onClose }}>
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
                    {children}
                </div>
            </div>
        </ModalContext.Provider>
    )
}

function ModalHeader({ className, children }: ModalHeaderProps) {
    return (
        <div className={cn('flex items-center justify-between border-b border-slate-100 px-3 py-2 sm:px-6 sm:py-4', className)}>
            {children}
        </div>
    )
}

function ModalTitleGroup({ className, children }: ModalTitleGroupProps) {
    return (
        <div className={cn('flex flex-col', className)}>
            {children}
        </div>
    )
}

function ModalOverline({ children, className }: ModalOverlineProps) {
    return (
        <Text as="p" variant="overline" className={cn('text-slate-400', className)}>
            {children}
        </Text>
    )
}

function ModalTitle({ children, className }: ModalTitleProps) {
    return (
        <Text as="h2" variant="subheading" className={cn('mt-1 hidden sm:block', className)}>
            {children}
        </Text>
    )
}

function ModalClose({ children = 'Close', className }: ModalCloseProps) {
    const { onClose } = useModalContext()

    return (
        <Button variant="ghost" size="sm" onClick={onClose} className={className}>
            {children}
        </Button>
    )
}

function ModalBody({ className, children }: ModalBodyProps) {
    return <div className={cn('px-4 py-4 sm:px-14 sm:py-10', className)}>{children}</div>
}

export const Modal = ((props: ModalProps) => {
    return <ModalRoot {...props} />
}) as ModalCompound

Modal.Header = ModalHeader
Modal.TitleGroup = ModalTitleGroup
Modal.Overline = ModalOverline
Modal.Title = ModalTitle
Modal.Close = ModalClose
Modal.Body = ModalBody