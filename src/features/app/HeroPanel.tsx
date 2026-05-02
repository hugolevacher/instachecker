import type { ReactElement } from 'react'
import copy from '../../content/appText.json'
import { Button } from '../../components/Button'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { Text } from '../../components/ui/Text'
import { UploadZone } from '../../components/UploadZone'

type HeroPanelProps = {
    isParsing: boolean
    error: string | null
    onOpenGuide: () => void
    onBrowse: () => void
    onFileSelected: (file: File) => void
}

export function HeroPanel({ isParsing, error, onOpenGuide, onBrowse, onFileSelected }: HeroPanelProps): ReactElement {
    return (
        <Card className="flex flex-col gap-4 p-6 sm:gap-6 sm:p-8 lg:sticky lg:top-6">
            <Card.Header className="space-y-4">
                <Badge>{copy.hero.eyebrow}</Badge>
                <Card.Title as="h1" variant="title" className="max-w-xl">
                    {copy.hero.headline}
                </Card.Title>
                <Card.Description className="max-w-xl">
                    {copy.hero.description}
                </Card.Description>
            </Card.Header>

            <Card.Body className="space-y-4 sm:space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                    <Button variant="primary" onClick={onOpenGuide} className="sm:px-6">
                        {copy.actions.guide}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={onBrowse}
                        className="sm:px-6 md:hidden bg-transparent! shadow-none!"
                    >
                        {copy.actions.browse}
                    </Button>

                    <Text as="p" variant="muted" className="max-w-md md:hidden">
                        {copy.upload.description}
                    </Text>
                </div>

                <div className="hidden md:block">
                    <UploadZone isParsing={isParsing} onBrowse={onBrowse} onFileSelected={onFileSelected} />
                </div>

                {isParsing ? (
                    <div className="rounded-3xl border border-[#e1306c]/20 bg-[#e1306c]/5 px-4 py-3 text-sm text-[#b11f54]">
                        {copy.upload.parsing}
                    </div>
                ) : null}

                {error ? (
                    <div className="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {error}
                    </div>
                ) : null}
            </Card.Body>

            <Card.Footer className="border-t border-slate-200/80 pt-4">
                <Text as="p" variant="caption" className="leading-5 text-slate-500 sm:text-sm">
                    {copy.credits.label}{' '}
                    <a
                        href={copy.credits.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-950 hover:decoration-slate-500"
                    >
                        {copy.credits.repoLabel}
                    </a>{' '}
                    · {copy.credits.builtBy}
                </Text>
            </Card.Footer>
        </Card>
    )
}
