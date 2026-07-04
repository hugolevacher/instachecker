import { useCallback, useState } from 'react'
import { analyzeInstagramZip } from '../features/instagram/analyzeInstagramZip'
import { parseDirectExport } from '../features/instagram/parseDirectExport'
import type { InstagramAnalysis } from '../features/instagram/types'

export function useInstagramAnalyzer() {
    const [analysis, setAnalysis] = useState<InstagramAnalysis | null>(null)
    const [isParsing, setIsParsing] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const reset = useCallback(() => {
        setAnalysis(null)
        setError(null)
    }, [])

    const run = useCallback(async (produce: () => Promise<InstagramAnalysis> | InstagramAnalysis, fallbackMessage: string) => {
        setIsParsing(true)
        setError(null)

        try {
            const result = await produce()
            setAnalysis(result)
        } catch (cause) {
            setAnalysis(null)
            setError(cause instanceof Error ? cause.message : fallbackMessage)
        } finally {
            setIsParsing(false)
        }
    }, [])

    const analyzeFile = useCallback(
        (file: File) => run(() => analyzeInstagramZip(file), 'Something went wrong while parsing the ZIP file.'),
        [run],
    )

    const analyzeText = useCallback(
        (text: string) => run(() => parseDirectExport(text), 'Could not read the pasted data.'),
        [run],
    )

    return { analysis, error, isParsing, analyzeFile, analyzeText, reset }
}
