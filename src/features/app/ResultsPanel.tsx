import type { ReactElement } from 'react'
import copy from '../../content/appText.json'
import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { Text } from '../../components/ui/Text'
import { RelationshipSection } from '../../components/RelationshipSection'
import type { InstagramAnalysis } from '../instagram/types'
import type { RelationshipKey } from './types'

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
        <Card variant="subtle" padding="md" className="space-y-4 sm:p-5">
            {analysis && activeSection ? (
                <>
                    <CardHeader>
                        <div className="grid grid-cols-3 gap-2">
                            {relationshipCopy.map((relationship) => {
                                const isActive = activeTab === relationship.key

                                return (
                                    <button
                                        key={relationship.key}
                                        type="button"
                                        onClick={() => onTabChange(relationship.key)}
                                        className={`rounded-2xl border px-3 py-3 text-left transition active:scale-[0.98] ${isActive
                                            ? 'border-[#e1306c] bg-[#e1306c] text-white shadow-lg shadow-pink-500/20'
                                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
                                            }`}
                                    >
                                        <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] opacity-80 sm:hidden">
                                            {relationship.mobileLabel}
                                        </span>
                                        <span className="hidden text-xs font-semibold uppercase tracking-[0.25em] opacity-80 sm:block">
                                            {relationship.label}
                                        </span>
                                        <span className="mt-1 block text-base font-semibold sm:text-lg">
                                            {counts?.[relationship.key]}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </CardHeader>

                    <CardBody className="mt-4">
                        <RelationshipSection
                            usernames={analysis[activeTab]}
                            searchValue={searchValue}
                            onSearchChange={onSearchChange}
                            onCopy={onCopy}
                            copied={copied}
                            onOpenAccount={onOpenAccount}
                            emptyLabel={activeSection.emptyLabel}
                        />
                    </CardBody>
                </>
            ) : (
                <Text as="div" variant="muted" className="rounded-4xl border border-dashed border-slate-200 bg-white/80 p-8 text-center shadow-sm">
                    {copy.results.placeholder}
                </Text>
            )}
        </Card>
    )
}
