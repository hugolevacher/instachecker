import { useEffect, useState } from 'react'
import copy from '../content/appText.json'
import { Button } from './Button'
import { Text } from './ui/Text'
import { relationshipSectionTheme } from '../theme/features/app/relationshipSection'

type RelationshipSectionProps = {
    usernames: string[]
    searchValue: string
    onSearchChange: (value: string) => void
    onCopy: () => void
    copied: boolean
    onOpenAccount: (username: string) => void
    emptyLabel: string
}

export function RelationshipSection({
    usernames,
    searchValue,
    onSearchChange,
    onCopy,
    copied,
    onOpenAccount,
    emptyLabel,
}: RelationshipSectionProps) {
    const [pressedUsername, setPressedUsername] = useState<string | null>(null)
    const sectionTheme = relationshipSectionTheme()
    const hasQuery = searchValue.length > 0

    const visibleUsernames = usernames.filter((username) =>
        username.toLowerCase().includes(searchValue.toLowerCase()),
    )

    useEffect(() => {
        if (!copied) {
            return
        }

        const timer = window.setTimeout(() => {
            setPressedUsername(null)
        }, 200)

        return () => window.clearTimeout(timer)
    }, [copied])

    return (
        <section className={sectionTheme.root()}>
            <div className={sectionTheme.actions()}>
                <Button variant="ghost" onClick={onCopy} className={sectionTheme.copyButton()}>
                    {copied ? copy.results.copied : copy.results.copy}
                </Button>
            </div>

            <div className={sectionTheme.searchBox()}>
                <label className={sectionTheme.searchLabel()} htmlFor="relationship-search">
                    {copy.results.search}
                </label>
                <div className="relative">
                    <input
                        id="relationship-search"
                        type="search"
                        value={searchValue}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder={copy.results.search}
                        className={sectionTheme.searchInput()}
                    />
                    {hasQuery ? (
                        <button
                            type="button"
                            onClick={() => onSearchChange('')}
                            aria-label={copy.results.clearSearch}
                            className={sectionTheme.clearButton()}
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                                <path
                                    d="M7 7l10 10M17 7L7 17"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.25"
                                />
                            </svg>
                        </button>
                    ) : null}
                </div>
            </div>

            <div className={sectionTheme.listWrapper()}>
                <div className={sectionTheme.scrollArea()}>
                    {visibleUsernames.length > 0 ? (
                        <ul className={sectionTheme.list()}>
                            {visibleUsernames.map((username) => {
                                const itemTheme = relationshipSectionTheme({ pressed: pressedUsername === username })

                                return (
                                    <li key={username} className={sectionTheme.item()}>
                                        <div className={sectionTheme.itemGrid()}>
                                            <span className={sectionTheme.username()}>@{username}</span>
                                            <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    setPressedUsername(username)
                                                    onOpenAccount(username)
                                                }}
                                                className={itemTheme.openButton()}
                                            >
                                                Open
                                            </Button>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        <Text as="div" variant="muted" className={sectionTheme.emptyState()}>
                            {searchValue ? copy.results.noMatches : emptyLabel}
                        </Text>
                    )}
                </div>
            </div>
        </section>
    )
}