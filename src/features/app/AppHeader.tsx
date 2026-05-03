import type { ReactElement } from 'react'
import copy from '../../content/appText.json'
import { Badge } from '../../components/ui/Badge'
import { Text } from '../../components/ui/Text'
import { appHeaderTheme } from '../../theme/features/app/header'

export function AppHeader(): ReactElement {
    const headerTheme = appHeaderTheme()

    return (
        <header className={headerTheme.root()}>
            <Text as="p" variant="eyebrow">
                {copy.brand.title}
            </Text>
            <Badge variant="muted" className={headerTheme.trustBadge()}>
                {copy.brand.trust}
            </Badge>
        </header>
    )
}
