import type { ReactElement } from 'react'
import copy from '../../content/appText.json'
import { Button } from '../../components/Button'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { Text } from '../../components/ui/Text'
import { UploadZone } from '../../components/UploadZone'
import { heroPanelTheme } from '../../theme/features/app/heroPanel'

type HeroPanelProps = {
    isParsing: boolean
    error: string | null
    onOpenGuide: () => void
    onBrowse: () => void
    onFileSelected: (file: File) => void
}

export function HeroPanel({ isParsing, error, onOpenGuide, onBrowse, onFileSelected }: HeroPanelProps): ReactElement {
    return (
        <Card className={heroPanelTheme.root}>
            <Card.Header className={heroPanelTheme.header}>
                <Badge>{copy.hero.eyebrow}</Badge>
                <Card.Title as="h1" variant="title" className={heroPanelTheme.title}>
                    {copy.hero.headline}
                </Card.Title>
                <Card.Description className={heroPanelTheme.description}>
                    {copy.hero.description}
                </Card.Description>
            </Card.Header>

            <Card.Body className={heroPanelTheme.body}>
                <div className={heroPanelTheme.actions}>
                    <Button variant="primary" onClick={onOpenGuide} className={heroPanelTheme.guideButton}>
                        {copy.actions.guide}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={onBrowse}
                        className={heroPanelTheme.browseButton}
                    >
                        {copy.actions.browse}
                    </Button>

                    <Text as="p" variant="muted" className={heroPanelTheme.helperText}>
                        {copy.upload.description}
                    </Text>
                </div>

                <div className={heroPanelTheme.desktopUpload}>
                    <UploadZone isParsing={isParsing} onBrowse={onBrowse} onFileSelected={onFileSelected} />
                </div>

                {isParsing ? (
                    <div className={heroPanelTheme.parsingNotice}>
                        {copy.upload.parsing}
                    </div>
                ) : null}

                {error ? (
                    <div className={heroPanelTheme.errorNotice}>
                        {error}
                    </div>
                ) : null}
            </Card.Body>

            <Card.Footer className={heroPanelTheme.footer}>
                <Text as="p" variant="caption" className={heroPanelTheme.footerText}>
                    {copy.credits.label}{' '}
                    <a
                        href={copy.credits.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={heroPanelTheme.footerLink}
                    >
                        {copy.credits.repoLabel}
                    </a>{' '}
                    · {copy.credits.builtBy}
                </Text>
            </Card.Footer>
        </Card>
    )
}
