import copy from '../../content/appText.json'
import { Button } from '../../components/Button'
import { Text } from '../../components/ui/Text'
import { directPanelTheme } from '../../theme/features/app/directPanel'

type DirectPanelProps = {
    pasteValue: string
    isParsing: boolean
    onPasteChange: (value: string) => void
    onAnalyze: () => void
    onOpenSetup: () => void
}

export function DirectPanel({ pasteValue, isParsing, onPasteChange, onAnalyze, onOpenSetup }: DirectPanelProps) {
    const theme = directPanelTheme()

    return (
        <div className={theme.root()}>
            <div className={theme.stepRow()}>
                <span className={theme.stepNumber()} aria-hidden="true">
                    1
                </span>
                <div className={theme.stepContent()}>
                    <Text as="p" className={theme.stepTitle()}>
                        {copy.direct.stepOneTitle}
                    </Text>
                    <Text as="p" className={theme.description()}>
                        {copy.direct.description}
                    </Text>
                    <Button variant="primary" onClick={onOpenSetup} className={theme.setupButton()}>
                        {copy.direct.setup}
                    </Button>
                </div>
            </div>

            <div className={theme.stepRow()}>
                <span className={theme.stepNumber()} aria-hidden="true">
                    2
                </span>
                <div className={theme.stepContent()}>
                    <label htmlFor="direct-paste" className={theme.pasteLabel()}>
                        {copy.direct.stepTwoTitle}
                    </label>
                    <textarea
                        id="direct-paste"
                        value={pasteValue}
                        onChange={(event) => onPasteChange(event.target.value)}
                        placeholder={copy.direct.pastePlaceholder}
                        className={theme.pasteInput()}
                    />
                    <Button
                        variant="secondary"
                        onClick={onAnalyze}
                        disabled={isParsing || !pasteValue.trim()}
                        className={theme.analyzeButton()}
                    >
                        {isParsing ? copy.direct.analyzing : copy.direct.analyze}
                    </Button>
                </div>
            </div>
        </div>
    )
}
