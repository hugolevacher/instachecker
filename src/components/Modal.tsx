import { createContext, useContext, useEffect, type ReactElement, type ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { Text } from './ui/Text'
import { modalTheme } from '../theme/primitives/modal'

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
            <div className={modalTheme.backdrop}>
                <Button
                    type="button"
                    variant="ghost"
                    size="none"
                    className={modalTheme.closeOverlay}
                    aria-label="Close guide"
                    onClick={onClose}
                />
                <div className={modalTheme.shell({ size })}>
                    {children}
                </div>
            </div>
        </ModalContext.Provider>
    )
}

function ModalHeader({ className, children }: ModalHeaderProps) {
    return (
        <div className={cn(modalTheme.header, className)}>
            {children}
        </div>
    )
}

function ModalTitleGroup({ className, children }: ModalTitleGroupProps) {
    return (
        <div className={cn(modalTheme.titleGroup, className)}>
            {children}
        </div>
    )
}

function ModalOverline({ children, className }: ModalOverlineProps) {
    return (
        <Text as="p" variant="overline" className={cn(modalTheme.overline, className)}>
            {children}
        </Text>
    )
}

function ModalTitle({ children, className }: ModalTitleProps) {
    return (
        <Text as="h2" variant="subheading" className={cn(modalTheme.title, className)}>
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
    return <div className={cn(modalTheme.body, className)}>{children}</div>
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