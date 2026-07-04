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
            <Text as="p" variant="body" className={theme.description()}>
                {copy.direct.description}
            </Text>

            <Button variant="primary" onClick={onOpenSetup} className={theme.setupButton()}>
                {copy.direct.setup}
            </Button>

            <div className={theme.pasteBlock()}>
                <label htmlFor="direct-paste" className={theme.pasteLabel()}>
                    {copy.direct.pasteLabel}
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
    )
}
