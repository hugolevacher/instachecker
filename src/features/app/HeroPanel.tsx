import type { ReactElement } from 'react'
import copy from '../../content/appText.json'
import { Button } from '../../components/Button'
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
    hasResults: boolean
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

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
            <path
                d="M5 13l4 4L19 7"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
            />
        </svg>
    )
}

type ZipPanelProps = {
    isParsing: boolean
    onOpenGuide: () => void
    onBrowse: () => void
    onFileSelected: (file: File) => void
}

function ZipPanel({ isParsing, onOpenGuide, onBrowse, onFileSelected }: ZipPanelProps) {
    const theme = directPanelTheme()

    return (
        <div className={theme.root()}>
            <div className={theme.stepRow()}>
                <span className={theme.stepNumber()} aria-hidden="true">
                    1
                </span>
                <div className={theme.stepContent()}>
                    <Text as="p" className={theme.stepTitle()}>
                        {copy.upload.stepOneTitle}
                    </Text>
                    <Text as="p" className={theme.description()}>
                        {copy.upload.blurb}
                    </Text>
                    <Button variant="primary" onClick={onOpenGuide} className={theme.setupButton()}>
                        {copy.actions.guide}
                    </Button>
                </div>
            </div>

            <div className={theme.stepRow()}>
                <span className={theme.stepNumber()} aria-hidden="true">
                    2
                </span>
                <div className={theme.stepContent()}>
                    <Text as="p" className={theme.stepTitle()}>
                        {copy.upload.stepTwoTitle}
                    </Text>
                    <div className={heroPanelTheme().desktopUpload()}>
                        <UploadZone isParsing={isParsing} onBrowse={onBrowse} onFileSelected={onFileSelected} />
                    </div>
                    <Button
                        variant="secondary"
                        onClick={onBrowse}
                        disabled={isParsing}
                        className={heroPanelTheme().browseButton()}
                    >
                        {copy.actions.browse}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export function HeroPanel({
    mode,
    pasteValue,
    isParsing,
    hasResults,
    error,
    onModeChange,
    onPasteChange,
    onAnalyzePaste,
    onOpenExporter,
    onOpenGuide,
    onBrowse,
    onFileSelected,
}: HeroPanelProps): ReactElement {
    // Once results exist the intro has done its job — hide it on mobile so the
    // lists aren't pushed a screen down. Desktop keeps it (side-by-side layout).
    const heroTheme = heroPanelTheme({ collapsed: hasResults })
    const switchTheme = directPanelTheme()

    return (
        <Card className={heroTheme.root()}>
            <Card.Header className={heroTheme.header()}>
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

                    <div className={switchTheme.modeSwitch()}>
                        {modeOrder.map((value) => {
                            const isActive = mode === value
                            const modeTheme = directPanelTheme({ active: isActive })

                            return (
                                <div key={value} className={modeTheme.modeItem()}>
                                    <h2>
                                        <button
                                            type="button"
                                            aria-expanded={isActive}
                                            aria-controls={`mode-panel-${value}`}
                                            onClick={() => onModeChange(value)}
                                            className={modeTheme.modeButton()}
                                        >
                                            {/* Methods are alternatives, not a sequence — no numbers here.
                                                Numbers belong to the steps inside the chosen method. */}
                                            <span className={modeTheme.modeMarker()} aria-hidden="true">
                                                {isActive ? <CheckIcon /> : null}
                                            </span>
                                            <span className={switchTheme.modeText()}>
                                                <span className={switchTheme.modeLabelRow()}>
                                                    <span className={modeTheme.modeLabel()}>
                                                        {copy.modes[value].label}
                                                    </span>
                                                    <span className={modeTheme.modeBadge()}>
                                                        {copy.modes[value].badge}
                                                    </span>
                                                </span>
                                                <span className={modeTheme.modeDetail()}>
                                                    {copy.modes[value].detail}
                                                </span>
                                            </span>
                                        </button>
                                    </h2>

                                    {isActive ? (
                                        <div id={`mode-panel-${value}`} className={modeTheme.modeBody()}>
                                            {value === 'zip' ? (
                                                <ZipPanel
                                                    isParsing={isParsing}
                                                    onOpenGuide={onOpenGuide}
                                                    onBrowse={onBrowse}
                                                    onFileSelected={onFileSelected}
                                                />
                                            ) : (
                                                <DirectPanel
                                                    pasteValue={pasteValue}
                                                    isParsing={isParsing}
                                                    onPasteChange={onPasteChange}
                                                    onAnalyze={onAnalyzePaste}
                                                    onOpenSetup={onOpenExporter}
                                                />
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                            )
                        })}
                    </div>
                </div>

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
                        <img src="/kofi-cup.png" alt="" aria-hidden="true" className={heroTheme.supportCup()} />
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
