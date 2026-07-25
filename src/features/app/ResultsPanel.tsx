import type { ReactElement } from 'react'
import copy from '../../content/appText.json'
import { Card } from '../../components/ui/Card'
import { Text } from '../../components/ui/Text'
import { RelationshipSection } from '../../components/RelationshipSection'
import type { InstagramAnalysis } from '../instagram/types'
import type { RelationshipKey } from './types'
import { resultsPanelTheme } from '../../theme/features/app/resultsPanel'

type RelationshipCopy = {
    key: RelationshipKey
    label: string
    mobileLabel: string
    hint: string
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
    const panelTheme = resultsPanelTheme()

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
        <Card variant="subtle" className={panelTheme.root()}>
            {analysis && activeSection ? (
                <>
                    <Card.Header>
                        <div className={panelTheme.tabs()} role="tablist" aria-label="Relationship">
                            {relationshipCopy.map((relationship) => {
                                const isActive = activeTab === relationship.key
                                const tabTheme = resultsPanelTheme({ active: isActive })

                                return (
                                    <button
                                        key={relationship.key}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() => onTabChange(relationship.key)}
                                        className={tabTheme.tabButton()}
                                    >
                                        <span className={tabTheme.tabCount()}>
                                            {counts?.[relationship.key]}
                                        </span>
                                        <span className={tabTheme.tabLabel()}>
                                            <span className="sm:hidden">{relationship.mobileLabel}</span>
                                            <span className="hidden sm:inline">{relationship.label}</span>
                                        </span>
                                    </button>
                                )
                            })}
                        </div>

                        <div className={panelTheme.hintRow()}>
                            <Text as="p" className={panelTheme.tabHint()}>
                                {activeSection.hint}
                            </Text>
                            <Text as="p" className={panelTheme.tabTotal()}>
                                {counts?.[activeTab]} total
                            </Text>
                        </div>
                    </Card.Header>

                    <Card.Body className={panelTheme.body()}>
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
                <div className={panelTheme.empty()}>
                    <Text as="p" variant="muted" className={panelTheme.placeholder()}>
                        {copy.results.placeholder}
                    </Text>

                    <ul className={panelTheme.previewList()}>
                        {relationshipCopy.map((relationship) => (
                            <li key={relationship.key} className={panelTheme.previewItem()}>
                                <span className={panelTheme.previewLabel()}>{relationship.label}</span>
                                <span className={panelTheme.previewHint()}>{relationship.hint}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Card>
    )
}
