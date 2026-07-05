import type { ReactElement } from 'react'
import copy from '../../content/appText.json'
import { Button } from '../../components/Button'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { Text } from '../../components/ui/Text'
import { UploadZone } from '../../components/UploadZone'
import { DirectPanel } from './DirectPanel'
import { heroPanelTheme } from '../../theme/features/app/heroPanel'
import { directPanelTheme } from '../../theme/features/app/directPanel'
import type { UploadMode } from './useAppController'

type HeroPanelProps = {
    mode: UploadMode
    pasteValue: string
    isParsing: boolean
    error: string | null
    onModeChange: (mode: UploadMode) => void
    onPasteChange: (value: string) => void
    onAnalyzePaste: () => void
    onOpenExporter: () => void
    onOpenGuide: () => void
    onBrowse: () => void
    onFileSelected: (file: File) => void
}

const modeOrder: UploadMode[] = ['direct', 'zip']

export function HeroPanel({
    mode,
    pasteValue,
    isParsing,
    error,
    onModeChange,
    onPasteChange,
    onAnalyzePaste,
    onOpenExporter,
    onOpenGuide,
    onBrowse,
    onFileSelected,
}: HeroPanelProps): ReactElement {
    const heroTheme = heroPanelTheme()
    const switchTheme = directPanelTheme()

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
                <div className={switchTheme.modeSwitchGroup()}>
                    <Text as="p" className={switchTheme.modeSwitchLabel()}>
                        {copy.modes.heading}
                    </Text>
                    <div className={switchTheme.modeSwitch()} role="tablist" aria-label="Data source">
                        {modeOrder.map((value) => {
                            const modeTheme = directPanelTheme({ active: mode === value })

                            return (
                                <button
                                    key={value}
                                    type="button"
                                    role="tab"
                                    aria-selected={mode === value}
                                    onClick={() => onModeChange(value)}
                                    className={modeTheme.modeButton()}
                                >
                                    <span className={switchTheme.modeLabelMobile()}>{copy.modes[value].mobileLabel}</span>
                                    <span className={switchTheme.modeLabelDesktop()}>{copy.modes[value].label}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {mode === 'zip' ? (
                    <>
                        <Text as="p" variant="body" className={heroTheme.description()}>
                            {copy.upload.blurb}
                        </Text>

                        <div className={heroTheme.actions()}>
                            <Button variant="primary" onClick={onOpenGuide} className={heroTheme.guideButton()}>
                                {copy.actions.guide}
                            </Button>
                            <Button variant="secondary" onClick={onBrowse} className={heroTheme.browseButton()}>
                                {copy.actions.browse}
                            </Button>
                        </div>

                        <div className={heroTheme.desktopUpload()}>
                            <UploadZone isParsing={isParsing} onBrowse={onBrowse} onFileSelected={onFileSelected} />
                        </div>
                    </>
                ) : (
                    <DirectPanel
                        pasteValue={pasteValue}
                        isParsing={isParsing}
                        onPasteChange={onPasteChange}
                        onAnalyze={onAnalyzePaste}
                        onOpenSetup={onOpenExporter}
                    />
                )}

                {isParsing ? <div className={heroTheme.parsingNotice()}>{copy.upload.parsing}</div> : null}

                {error ? <div className={heroTheme.errorNotice()}>{error}</div> : null}
            </Card.Body>

            <Card.Footer className={heroTheme.footer()}>
                <div className={heroTheme.footerGroup()}>
                    <a
                        href={copy.support.url}
                        target="_blank"
                        rel="noreferrer"
                        className={heroTheme.supportButton()}
                    >
                        {copy.support.cta}
                    </a>

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
                        · {copy.credits.builtByLabel}{' '}
                        <a
                            href={copy.credits.authorUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={heroTheme.footerLink()}
                        >
                            {copy.credits.authorName}
                        </a>
                    </Text>
                </div>
            </Card.Footer>
        </Card>
    )
}
