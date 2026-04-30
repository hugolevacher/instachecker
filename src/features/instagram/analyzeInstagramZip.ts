import JSZip from 'jszip'
import type { InstagramAnalysis } from './types'

type JsonRecord = Record<string, unknown>

const followerFilePattern = /(^|\/)(followers[^/]*\.json)$/i
const followingFilePattern = /(^|\/)following\.json$/i
const allowedFolderPattern = /(^|\/)connections\/followers_and_following\//i

function normalizeUsername(value: string) {
    return value.trim().toLowerCase()
}

function extractUsername(item: unknown) {
    if (!item || typeof item !== 'object') {
        return null
    }

    const record = item as JsonRecord
    const stringListData = record.string_list_data

    if (Array.isArray(stringListData)) {
        for (const entry of stringListData) {
            if (entry && typeof entry === 'object') {
                const value = (entry as JsonRecord).value
                if (typeof value === 'string' && value.trim()) {
                    return normalizeUsername(value)
                }
            }
        }
    }

    const title = record.title
    if (typeof title === 'string' && title.trim()) {
        return normalizeUsername(title)
    }

    return null
}

function extractEntries(json: unknown) {
    if (Array.isArray(json)) {
        return json
    }

    if (!json || typeof json !== 'object') {
        return []
    }

    const record = json as JsonRecord
    const possibleArrays = [
        record.relationships_following,
        record.relationships_followers,
        record.following,
        record.followers,
    ]

    for (const value of possibleArrays) {
        if (Array.isArray(value)) {
            return value
        }
    }

    return []
}

async function readJsonFile(zip: JSZip, path: string) {
    const file = zip.file(path)
    if (!file) {
        return null
    }

    const text = await file.async('text')

    try {
        return JSON.parse(text) as unknown
    } catch {
        throw new Error(`Could not parse ${path}. The Instagram export file looks invalid.`)
    }
}

function uniqueSorted(values: Iterable<string>) {
    return [...new Set(values)].sort((left, right) => left.localeCompare(right))
}

function collectUsernames(json: unknown) {
    const entries = extractEntries(json)
    const usernames: string[] = []

    for (const entry of entries) {
        const username = extractUsername(entry)
        if (username) {
            usernames.push(username)
        }
    }

    return uniqueSorted(usernames)
}

export async function analyzeInstagramZip(file: File): Promise<InstagramAnalysis> {
    const archive = await JSZip.loadAsync(file)
    const fileNames = Object.keys(archive.files).filter((name) => !archive.files[name]?.dir)

    const connectionFiles = fileNames.filter((name) => allowedFolderPattern.test(name))
    const candidateFiles = connectionFiles.length > 0 ? connectionFiles : fileNames

    const followerFiles = candidateFiles.filter((name) => followerFilePattern.test(name))
    const followingFile = candidateFiles.find((name) => followingFilePattern.test(name))

    if (!followerFiles.length || !followingFile) {
        throw new Error(
            'Missing follower or following files. Make sure you uploaded the Instagram ZIP export with connections/followers_and_following data.',
        )
    }

    const followerSets = await Promise.all(followerFiles.map((path) => readJsonFile(archive, path)))
    const followingJson = await readJsonFile(archive, followingFile)

    const followers = uniqueSorted(followerSets.flatMap((json) => collectUsernames(json)))
    const following = collectUsernames(followingJson)

    const followerLookup = new Set(followers)
    const followingLookup = new Set(following)

    const mutuals = following.filter((username) => followerLookup.has(username))
    const notFollowingBack = following.filter((username) => !followerLookup.has(username))
    const fans = followers.filter((username) => !followingLookup.has(username))

    return {
        sourceName: file.name,
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