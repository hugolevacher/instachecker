import type { ReactElement } from 'react'
import copy from '../../content/appText.json'
import { Badge } from '../../components/ui/Badge'
import { Text } from '../../components/ui/Text'
import { appHeaderTheme } from '../../theme/features/app/header'

export function AppHeader(): ReactElement {
    const headerTheme = appHeaderTheme()

    return (
        <header className={headerTheme.root()}>
            <Text as="p" variant="eyebrow" className={headerTheme.brand()}>
                {copy.brand.title}
            </Text>
            <Badge variant="muted" className={headerTheme.trustBadge()}>
                <svg viewBox="0 0 24 24" className={headerTheme.trustIcon()} aria-hidden="true">
                    <path
                        d="M12 3l7 3v5.5c0 4.2-2.9 7.7-7 8.5-4.1-.8-7-4.3-7-8.5V6l7-3z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                    />
                    <path
                        d="M9 12l2 2 4-4"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                    />
                </svg>
                {copy.brand.trust}
            </Badge>
        </header>
    )
}
