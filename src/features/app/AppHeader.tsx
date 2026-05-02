import type { ReactElement } from 'react'
import copy from '../../content/copy.json'
import { Badge } from '../../components/ui/Badge'
import { Text } from '../../components/ui/Text'

export function AppHeader(): ReactElement {
    return (
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Text as="p" variant="eyebrow">
                {copy.brand.title}
            </Text>
            <Badge variant="muted" className="self-start text-[11px] normal-case tracking-normal sm:text-xs">
                {copy.brand.trust}
            </Badge>
        </header>
    )
}
