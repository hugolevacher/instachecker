import type { InstagramAnalysis } from './types'

export function normalizeUsername(value: string) {
    return value.trim().toLowerCase()
}

export function uniqueSorted(values: Iterable<string>) {
    return [...new Set(values)].sort((left, right) => left.localeCompare(right))
}

export function buildAnalysis(
    rawFollowers: Iterable<string>,
    rawFollowing: Iterable<string>,
    sourceName: string,
): InstagramAnalysis {
    const followers = uniqueSorted([...rawFollowers].map(normalizeUsername).filter(Boolean))
    const following = uniqueSorted([...rawFollowing].map(normalizeUsername).filter(Boolean))

    const followerLookup = new Set(followers)
    const followingLookup = new Set(following)

    const mutuals = following.filter((username) => followerLookup.has(username))
    const notFollowingBack = following.filter((username) => !followerLookup.has(username))
    const fans = followers.filter((username) => !followingLookup.has(username))

    return {
        sourceName,
        followingCount: following.length,
        followersCount: followers.length,
        mutualCount: mutuals.length,
        notFollowingBackCount: notFollowingBack.length,
        fansCount: fans.length,
        following,
        followers,
        mutuals,
        notFollowingBack,
        fans,
    }
}
