import { useState } from 'react'
import copy from '../content/appText.json'
import { Modal } from './Modal'
import { Button } from './Button'
import { Text } from './ui/Text'
import { BOOKMARKLET_HREF } from '../features/instagram/bookmarklet'
import { bookmarkletGuideTheme } from '../theme/features/app/directPanel'

const guide = copy.bookmarkletGuide

function detectMobile() {
    if (typeof window === 'undefined') {
        return false
    }

    const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches ?? false
    return coarsePointer || /mobi|android|iphone|ipad/i.test(navigator.userAgent)
}

type BookmarkletGuideProps = {
    open: boolean
    onClose: () => void
}

export function BookmarkletGuide({ open, onClose }: BookmarkletGuideProps) {
    const [platform, setPlatform] = useState<'desktop' | 'mobile'>(detectMobile() ? 'mobile' : 'desktop')
    const [copied, setCopied] = useState(false)
    const theme = bookmarkletGuideTheme()

    const isDesktop = platform === 'desktop'
    const installSteps = isDesktop ? guide.desktopSteps : guide.mobileSteps
    const runSteps = isDesktop ? guide.desktopRun : guide.mobileRun

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(BOOKMARKLET_HREF)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1400)
        } catch {
            // Clipboard access varies by browser; on desktop the drag pill is the fallback.
        }
    }

    return (
        <Modal open={open} onClose={onClose} size="narrow">
            <Modal.Header>
                <Modal.TitleGroup>
                    <Modal.Overline>Guide</Modal.Overline>
                    <Modal.Title>{guide.title}</Modal.Title>
                </Modal.TitleGroup>
                <Modal.Close />
            </Modal.Header>
            <Modal.Body>
                <div className={theme.root()}>
                    <Text as="p" variant="body" className={theme.intro()}>
                        {guide.intro}
                    </Text>

                    <div className={theme.tabs()}>
                        {(['desktop', 'mobile'] as const).map((value) => {
                            const tabTheme = bookmarkletGuideTheme({ active: platform === value })

                            return (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setPlatform(value)}
                                    className={tabTheme.tab()}
                                >
                                    {value === 'desktop' ? guide.desktopTab : guide.mobileTab}
                                </button>
                            )
                        })}
                    </div>

                    <div className={theme.stepBlock()}>
                        <Text as="h3" variant="subheading" className={theme.stepTitle()}>
                            {guide.installTitle}
                        </Text>
                        <ol className={theme.stepList()}>
                            {installSteps.map((step) => (
                                <li key={step}>{step}</li>
                            ))}
                        </ol>

                        <div className={theme.controls()}>
                            {isDesktop ? (
                                <a
                                    ref={(node) => {
                                        // React strips `javascript:` from JSX href; set it on the DOM node so the drag works.
                                        node?.setAttribute('href', BOOKMARKLET_HREF)
                                    }}
                                    draggable
                                    onClick={(event) => event.preventDefault()}
                                    className={theme.dragPill()}
                                >
                                    {guide.drag}
                                </a>
                            ) : null}
                            <Button variant="secondary" onClick={handleCopy} className={theme.copyButton()}>
                                {copied ? guide.copied : guide.copy}
                            </Button>
                        </div>
                    </div>

                    <div className={theme.stepBlock()}>
                        <Text as="h3" variant="subheading" className={theme.stepTitle()}>
                            {guide.runTitle}
                        </Text>
                        <ol className={theme.stepList()}>
                            {runSteps.map((step) => (
                                <li key={step}>{step}</li>
                            ))}
                        </ol>
                    </div>

                    <div className={theme.doneRow()}>
                        <Button variant="primary" onClick={onClose}>
                            {guide.done}
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
