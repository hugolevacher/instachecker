import type { ReactElement } from 'react'
import copy from '../../content/appText.json'
import { Card } from '../../components/ui/Card'
import { Text } from '../../components/ui/Text'
import { RelationshipSection } from '../../components/RelationshipSection'
import type { InstagramAnalysis } from '../instagram/types'
import type { RelationshipKey } from './types'
import { resultsPanelTheme } from '../../theme/features/app/resultsPanel'
import { cn } from '../../lib/cn'

type RelationshipCopy = {
    key: RelationshipKey
    label: string
    mobileLabel: string
    emptyLabel: string
}

const relationshipCopy = copy.relationships as RelationshipCopy[]

type ResultsPanelProps = {
    analysis: InstagramAnalysis | null
    activeTab: RelationshipKey
    searchValue: string
    onTabChange: (tab: RelationshipKey) => void
    onSearchChange: (value: string) => void
    onCopy: () => void
    copied: boolean
    onOpenAccount: (username: string) => void
}

export function ResultsPanel({
    analysis,
    activeTab,
    searchValue,
    onTabChange,
    onSearchChange,
    onCopy,
    copied,
    onOpenAccount,
}: ResultsPanelProps): ReactElement {
    const activeSection = analysis
        ? relationshipCopy.find((relationship) => relationship.key === activeTab)
        : null

    const counts = analysis
        ? {
            notFollowingBack: analysis.notFollowingBackCount,
            fans: analysis.fansCount,
            mutuals: analysis.mutualCount,
        }
        : null

    return (
        <Card variant="subtle" padding="none" className={resultsPanelTheme.root}>
            {analysis && activeSection ? (
                <>
                    <Card.Header>
                        <div className={resultsPanelTheme.tabs}>
                            {relationshipCopy.map((relationship) => {
                                const isActive = activeTab === relationship.key

                                return (
                                    <button
                                        key={relationship.key}
                                        type="button"
                                        onClick={() => onTabChange(relationship.key)}
                                        className={cn(
                                            resultsPanelTheme.tabButton,
                                            isActive ? resultsPanelTheme.tabButtonActive : resultsPanelTheme.tabButtonIdle,
                                        )}
                                    >
                                        <span className={resultsPanelTheme.tabLabelMobile}>
                                            {relationship.mobileLabel}
                                        </span>
                                        <span className={resultsPanelTheme.tabLabelDesktop}>
                                            {relationship.label}
                                        </span>
                                        <span className={resultsPanelTheme.tabCount}>
                                            {counts?.[relationship.key]}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </Card.Header>

                    <Card.Body className={resultsPanelTheme.body}>
                        <RelationshipSection
                            usernames={analysis[activeTab]}
                            searchValue={searchValue}
                            onSearchChange={onSearchChange}
                            onCopy={onCopy}
                            copied={copied}
                            onOpenAccount={onOpenAccount}
                            emptyLabel={activeSection.emptyLabel}
                        />
                    </Card.Body>
                </>
            ) : (
                <Text as="p" variant="muted" className={resultsPanelTheme.placeholder}>
                    {copy.results.placeholder}
                </Text>
            )}
        </Card>
    )
}
