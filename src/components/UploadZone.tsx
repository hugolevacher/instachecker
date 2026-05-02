import type { DragEvent, KeyboardEvent } from 'react'
import copy from '../content/appText.json'
import { Button } from './Button'
import { Badge } from './ui/Badge'
import { Card } from './ui/Card'
import { uploadZoneTheme } from '../theme/features/app/uploadZone'

type UploadZoneProps = {
    isParsing: boolean
    onBrowse: () => void
    onFileSelected: (file: File) => void
}

export function UploadZone({ isParsing, onBrowse, onFileSelected }: UploadZoneProps) {
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
            className={uploadZoneTheme.root}
        >
            <Card.Body className={uploadZoneTheme.body}>
                <Card.Header className={uploadZoneTheme.header}>
                    <Badge>{copy.upload.eyebrow}</Badge>
                    <Card.Title as="h2" variant="heading" className="max-w-xl">
                        {copy.upload.title}
                    </Card.Title>
                    <Card.Description className="max-w-xl sm:text-base">
                        {copy.upload.description}
                    </Card.Description>
                </Card.Header>

                <div className={uploadZoneTheme.buttonWrap}>
                    <Button
                        variant="primary"
                        onClick={(event) => {
                            event.stopPropagation()
                            onBrowse()
                        }}
                        disabled={isParsing}
                        className={uploadZoneTheme.button}
                    >
                        {isParsing ? 'Parsing archive...' : copy.upload.select}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}