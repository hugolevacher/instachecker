import { useCallback, useState } from 'react'
import { analyzeInstagramZip } from '../features/instagram/analyzeInstagramZip'
import type { InstagramAnalysis } from '../features/instagram/types'

export function useInstagramAnalyzer() {
    const [analysis, setAnalysis] = useState<InstagramAnalysis | null>(null)
    const [isParsing, setIsParsing] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const reset = useCallback(() => {
        setAnalysis(null)
        setError(null)
    }, [])

    const analyzeFile = useCallback(async (file: File) => {
        setIsParsing(true)
        setError(null)

        try {
            const result = await analyzeInstagramZip(file)
            setAnalysis(result)
        } catch (cause) {
            setAnalysis(null)
            setError(cause instanceof Error ? cause.message : 'Something went wrong while parsing the ZIP file.')
        } finally {
            setIsParsing(false)
        }
    }, [])

    return { analysis, error, isParsing, analyzeFile, reset }
}