import { useEffect, useState } from 'react'
import copy from '../content/appText.json'
import { cn } from '../lib/cn'
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
        <section className={relationshipSectionTheme.root}>
            <div className={relationshipSectionTheme.actions}>
                <Button variant="ghost" onClick={onCopy} className={relationshipSectionTheme.copyButton}>
                    {copied ? copy.results.copied : copy.results.copy}
                </Button>
            </div>

            <div className={relationshipSectionTheme.searchBox}>
                <label className={relationshipSectionTheme.searchLabel} htmlFor="relationship-search">
                    {copy.results.search}
                </label>
                <div className="relative">
                    <input
                        id="relationship-search"
                        type="search"
                        value={searchValue}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder={copy.results.search}
                        className={relationshipSectionTheme.searchInput}
                    />
                    {hasQuery ? (
                        <button
                            type="button"
                            onClick={() => onSearchChange('')}
                            aria-label={copy.results.clearSearch}
                            className={relationshipSectionTheme.clearButton}
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

            <div className={relationshipSectionTheme.listWrapper}>
                <div className={relationshipSectionTheme.scrollArea}>
                    {visibleUsernames.length > 0 ? (
                        <ul className={relationshipSectionTheme.list}>
                            {visibleUsernames.map((username) => (
                                <li key={username} className={relationshipSectionTheme.item}>
                                    <div className={relationshipSectionTheme.itemGrid}>
                                        <span className={relationshipSectionTheme.username}>@{username}</span>
                                        <Button
                                            variant="secondary"
                                            onClick={() => {
                                                setPressedUsername(username)
                                                onOpenAccount(username)
                                            }}
                                            className={cn(
                                                relationshipSectionTheme.openButton,
                                                pressedUsername === username && relationshipSectionTheme.openButtonPressed,
                                            )}
                                        >
                                            Open
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Text as="div" variant="muted" className={relationshipSectionTheme.emptyState}>
                            {searchValue ? copy.results.noMatches : emptyLabel}
                        </Text>
                    )}
                </div>
            </div>
        </section>
    )
}