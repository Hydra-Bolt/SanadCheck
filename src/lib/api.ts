const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://your-render-url.com'

export interface ExtractNarratorsRequest {
  hadith_text: string
}

export interface ExtractNarratorsResponse {
  narrators: string[]
  sanad_chain: string
  success: boolean
  message: string
}

export interface AnalyzeNarratorRequest {
  narrator_name: string
}

export interface AnalyzeNarratorResponse {
  narrator_name: string
  reliability_grade: string
  confidence_level: string
  reasoning: string
  scholarly_consensus: string
  known_issues: string
  biographical_info: string
  recommendation: string
  success: boolean
  message: string
}

export interface AnalyzeNarratorChainRequest {
  chain: string[]
}

export interface ChainAnalysisMetadata {
  total_narrators: number
  successful_analyses: number
  analysis_method: string
}

export interface AnalyzeNarratorChainResponse {
  chain: string[]
  individual_analyses: Record<string, AnalyzeNarratorResponse>
  chain_synthesis: Record<string, any>
  metadata: ChainAnalysisMetadata
}

export async function extractNarrators(hadithText: string): Promise<ExtractNarratorsResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/extract-narrators`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hadith_text: hadithText }),
  })

  if (!response.ok) {
    throw new Error(`Failed to extract narrators: ${response.statusText}`)
  }

  return response.json()
}

export async function analyzeNarrator(narratorName: string): Promise<AnalyzeNarratorResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/analyze-narrator`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ narrator_name: narratorName }),
  })

  if (!response.ok) {
    throw new Error(`Failed to analyze narrator: ${response.statusText}`)
  }

  return response.json()
}

export async function analyzeNarratorChain(chain: string[]): Promise<AnalyzeNarratorChainResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/analyze-narrator-chain`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chain),
  })

  if (!response.ok) {
    throw new Error(`Failed to analyze narrator chain: ${response.statusText}`)
  }

  return response.json()
}
