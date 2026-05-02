import type { DragEvent, KeyboardEvent } from 'react'
import copy from '../content/copy.json'
import { Button } from './Button'
import { Badge } from './ui/Badge'
import { Card, CardBody } from './ui/Card'
import { Text } from './ui/Text'

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
            className="group cursor-pointer transition hover:border-[#e1306c]/40 hover:bg-white lg:min-h-[18rem]"
        >
            <CardBody className="flex h-full flex-col justify-between gap-6 p-5 sm:p-6 lg:p-8">
                <div className="space-y-3">
                    <Badge>{copy.upload.eyebrow}</Badge>
                    <Text as="h2" variant="heading" className="max-w-xl">
                        {copy.upload.title}
                    </Text>
                    <Text as="p" variant="body" className="max-w-xl sm:text-base">
                        {copy.upload.description}
                    </Text>
                </div>

                <div className="flex justify-start">
                    <Button
                        variant="primary"
                        onClick={(event) => {
                            event.stopPropagation()
                            onBrowse()
                        }}
                        disabled={isParsing}
                        className="sm:px-5"
                    >
                        {isParsing ? 'Parsing archive...' : copy.upload.select}
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}