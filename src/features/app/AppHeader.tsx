import type { ReactElement } from 'react'
import copy from '../../content/appText.json'
import { Badge } from '../../components/ui/Badge'
import { Text } from '../../components/ui/Text'
import { appHeaderTheme } from '../../theme/features/app/header'

export function AppHeader(): ReactElement {
    return (
        <header className={appHeaderTheme.root}>
            <Text as="p" variant="eyebrow">
                {copy.brand.title}
            </Text>
            <Badge variant="muted" className={appHeaderTheme.trustBadge}>
                {copy.brand.trust}
            </Badge>
        </header>
    )
}
