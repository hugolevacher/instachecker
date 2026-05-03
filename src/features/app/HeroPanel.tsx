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
    const heroTheme = heroPanelTheme()

    return (
        <Card className={heroTheme.root()}>
            <Card.Header className={heroTheme.header()}>
                <Badge>{copy.hero.eyebrow}</Badge>
                <Card.Title as="h1" variant="title" className={heroTheme.title()}>
                    {copy.hero.headline}
                </Card.Title>
                <Card.Description className={heroTheme.description()}>
                    {copy.hero.description}
                </Card.Description>
            </Card.Header>

            <Card.Body className={heroTheme.body()}>
                <div className={heroTheme.actions()}>
                    <Button variant="primary" onClick={onOpenGuide} className={heroTheme.guideButton()}>
                        {copy.actions.guide}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={onBrowse}
                        className={heroTheme.browseButton()}
                    >
                        {copy.actions.browse}
                    </Button>

                    <Text as="p" variant="muted" className={heroTheme.helperText()}>
                        {copy.upload.mobileDescription}
                    </Text>
                </div>

                <div className={heroTheme.desktopUpload()}>
                    <UploadZone isParsing={isParsing} onBrowse={onBrowse} onFileSelected={onFileSelected} />
                </div>

                {isParsing ? (
                    <div className={heroTheme.parsingNotice()}>
                        {copy.upload.parsing}
                    </div>
                ) : null}

                {error ? (
                    <div className={heroTheme.errorNotice()}>
                        {error}
                    </div>
                ) : null}
            </Card.Body>

            <Card.Footer className={heroTheme.footer()}>
                <Text as="p" variant="caption" className={heroTheme.footerText()}>
                    {copy.credits.label}{' '}
                    <a
                        href={copy.credits.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={heroTheme.footerLink()}
                    >
                        {copy.credits.repoLabel}
                    </a>{' '}
                    · {copy.credits.builtBy}
                </Text>
            </Card.Footer>
        </Card>
    )
}
