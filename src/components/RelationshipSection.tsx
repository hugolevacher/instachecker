import { useEffect, useState } from 'react'
import copy from '../content/copy.json'
import { Button } from './Button'
import { Text } from './ui/Text'

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
        <section className="flex min-h-0 flex-col px-1 pt-2 sm:px-0">
            <div className="flex items-center justify-end gap-4">
                <Button
                    variant="ghost"
                    onClick={onCopy}
                    className="px-3 py-2 text-sm"
                >
                    {copied ? copy.results.copied : copy.results.copy}
                </Button>
            </div>

            <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <label className="sr-only" htmlFor="relationship-search">
                    {copy.results.search}
                </label>
                <div className="relative">
                    <input
                        id="relationship-search"
                        type="search"
                        value={searchValue}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder={copy.results.search}
                        className="w-full min-w-0 bg-transparent pr-10 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                    {hasQuery ? (
                        <button
                            type="button"
                            onClick={() => onSearchChange('')}
                            aria-label={copy.results.clearSearch}
                            className="absolute right-0 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition active:scale-95 hover:border-[#e1306c]/40 hover:text-[#e1306c]"
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

            <div className="mt-2 flex min-h-0 flex-1 flex-col">
                <div className="flex-1 overflow-y-auto pr-1">
                    {visibleUsernames.length > 0 ? (
                        <ul className="space-y-2">
                            {visibleUsernames.map((username) => (
                                <li key={username} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm overflow-hidden">
                                    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                                        <span className="min-w-0 flex-1 truncate">@{username}</span>
                                        <Button
                                            variant="secondary"
                                            onClick={() => {
                                                setPressedUsername(username)
                                                onOpenAccount(username)
                                            }}
                                            className={`shrink-0 px-3 py-2 text-xs transition-transform duration-150 ${pressedUsername === username ? 'scale-95' : ''}`}
                                        >
                                            Open
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Text as="div" variant="muted" className="flex h-full items-center justify-center px-4 py-10 text-center">
                            {searchValue ? copy.results.noMatches : emptyLabel}
                        </Text>
                    )}
                </div>
            </div>
        </section>
    )
}