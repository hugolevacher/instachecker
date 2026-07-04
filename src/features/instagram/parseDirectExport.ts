import type { InstagramAnalysis } from './types'
import { buildAnalysis } from './buildAnalysis'

const INVALID_MESSAGE =
    "That doesn't look right. Paste the data the Instagram Exporter copied for you (it starts with a { )."

function toUsernames(value: unknown) {
    if (!Array.isArray(value)) {
        return []
    }

    return value.filter((entry): entry is string => typeof entry === 'string')
}

export function parseDirectExport(text: string): InstagramAnalysis {
    let data: unknown
    try {
        data = JSON.parse(text.trim())
    } catch {
        throw new Error(INVALID_MESSAGE)
    }

    if (!data || typeof data !== 'object') {
        throw new Error(INVALID_MESSAGE)
    }

    const record = data as Record<string, unknown>
    const followers = toUsernames(record.followers)
    const following = toUsernames(record.following)

    if (!followers.length && !following.length) {
        throw new Error('No followers or following were found in the pasted data. Run the exporter again on instagram.com.')
    }

    return buildAnalysis(followers, following, 'From Instagram')
}
