import type { DragEvent, KeyboardEvent } from 'react'
import copy from '../content/appText.json'
import { Card } from './ui/Card'
import { uploadZoneTheme } from '../theme/features/app/uploadZone'

type UploadZoneProps = {
    isParsing: boolean
    onBrowse: () => void
    onFileSelected: (file: File) => void
}

export function UploadZone({ isParsing, onBrowse, onFileSelected }: UploadZoneProps) {
    const uploadTheme = uploadZoneTheme()

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const file = event.dataTransfer.files?.[0]
        if (file) {
            onFileSelected(file)
        }
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onBrowse()
        }
    }

    return (
        <Card
            variant="dashed"
            padding="none"
            role="button"
            tabIndex={0}
            aria-label="Load Instagram ZIP"
            onClick={onBrowse}
            onKeyDown={handleKeyDown}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            className={uploadTheme.root()}
        >
            <Card.Body className={uploadTheme.body()}>
                <svg viewBox="0 0 24 24" className={uploadTheme.icon()} aria-hidden="true">
                    <path
                        d="M12 16V4m0 0L8 8m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.75"
                    />
                </svg>

                <Card.Header className={uploadTheme.header()}>
                    <Card.Title as="h3" variant="subheading" className={uploadTheme.title()}>
                        {isParsing ? copy.upload.parsing : copy.upload.title}
                    </Card.Title>
                    <Card.Description variant="caption" className={uploadTheme.description()}>
                        {copy.upload.description}
                    </Card.Description>
                </Card.Header>
            </Card.Body>
        </Card>
    )
}