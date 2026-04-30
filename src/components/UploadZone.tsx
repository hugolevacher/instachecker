import type { DragEvent, KeyboardEvent } from 'react'
import { Button } from './Button'

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
        <div
            role="button"
            tabIndex={0}
            aria-label="Upload Instagram ZIP"
            onClick={onBrowse}
            onKeyDown={handleKeyDown}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            className="group cursor-pointer rounded-[2rem] border-2 border-dashed border-slate-200 bg-white/80 p-5 shadow-sm transition hover:border-[#e1306c]/40 hover:bg-white sm:p-6 lg:min-h-[18rem] lg:p-8"
        >
            <div className="flex h-full flex-col justify-between gap-6">
                <div className="space-y-3">
                    <div className="inline-flex rounded-full border border-[#e1306c]/15 bg-[#e1306c]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#e1306c]">
                        Upload ZIP
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                        Drop your Instagram export here
                    </h2>
                    <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                        Everything runs in your browser. No account login, no sync, no server upload.
                        On desktop you can drag and drop the ZIP or click the button below.
                    </p>
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
                        {isParsing ? 'Parsing archive...' : 'Choose ZIP file'}
                    </Button>
                </div>
            </div>
        </div>
    )
}