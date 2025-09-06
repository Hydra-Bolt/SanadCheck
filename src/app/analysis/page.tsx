'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeftIcon, 
  MagnifyingGlassIcon, 
  UserIcon,
  BookOpenIcon,
  LinkIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'
import { 
  extractNarrators, 
  analyzeNarrator, 
  analyzeNarratorChain,
  ExtractNarratorsResponse, 
  AnalyzeNarratorResponse,
  AnalyzeNarratorChainResponse
} from '../../lib/api'
import { 
  Card, 
  Button, 
  LoadingState, 
  ErrorState, 
  EmptyState, 
  NarratorAnalysisCard 
} from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'

interface NarratorAnalysis extends AnalyzeNarratorResponse {
  isAnalyzing?: boolean
}

export default function AnalysisPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [hadithText, setHadithText] = useState('')
  const [extractionData, setExtractionData] = useState<ExtractNarratorsResponse | null>(null)
  const [narratorAnalyses, setNarratorAnalyses] = useState<Record<string, NarratorAnalysis>>({})
  const [narratorOrder, setNarratorOrder] = useState<string[]>([])
  const [minimizedNarrators, setMinimizedNarrators] = useState<Record<string, boolean>>({})
  const [chainAnalysis, setChainAnalysis] = useState<AnalyzeNarratorChainResponse | null>(null)
  const [isExtracting, setIsExtracting] = useState(false)
  const [isAnalyzingChain, setIsAnalyzingChain] = useState(false)
  const [extractionError, setExtractionError] = useState<string | null>(null)
  const [chainAnalysisError, setChainAnalysisError] = useState<string | null>(null)

  // Extract narrators on page load or when hadith text changes
  useEffect(() => {
    if (hadithText.trim()) {
      handleExtractNarrators()
    } else {
      // Clear results if text is empty
      setExtractionData(null)
      setNarratorAnalyses({})
      setNarratorOrder([])
      setMinimizedNarrators({})
      setChainAnalysis(null)
      setExtractionError(null)
      setChainAnalysisError(null)
    }
  }, [hadithText])

  const handleExtractNarrators = async () => {
    if (!isAuthenticated) {
      setExtractionError('Please log in to analyze hadith texts')
      return
    }

    setIsExtracting(true)
    setExtractionError(null)
    
    try {
      const result = await extractNarrators(hadithText)
      setExtractionData(result)
    } catch (error) {
      setExtractionError(error instanceof Error ? error.message : 'Failed to extract narrators')
    } finally {
      setIsExtracting(false)
    }
  }

  const handleAnalyzeNarrator = async (narratorName: string) => {
    if (!isAuthenticated) {
      setNarratorAnalyses(prev => ({
        ...prev,
        [narratorName]: { 
          ...prev[narratorName],
          success: false,
          message: 'Please log in to analyze narrators'
        }
      }))
      return
    }

    // Add to order if not already present
    setNarratorOrder(prev => {
      if (!prev.includes(narratorName)) {
        return [...prev, narratorName]
      }
      return prev
    })

    setNarratorAnalyses(prev => ({
      ...prev,
      [narratorName]: { ...prev[narratorName], isAnalyzing: true }
    }))

    try {
      const result = await analyzeNarrator(narratorName)
      setNarratorAnalyses(prev => ({
        ...prev,
        [narratorName]: result
      }))
    } catch (error) {
      setNarratorAnalyses(prev => ({
        ...prev,
        [narratorName]: { 
          ...prev[narratorName], 
          isAnalyzing: false,
          success: false,
          message: error instanceof Error ? error.message : 'Analysis failed'
        }
      }))
    }
  }

  const handleAnalyzeChain = async () => {
    if (!extractionData?.narrators) return
    
    if (!isAuthenticated) {
      setChainAnalysisError('Please log in to analyze chains')
      return
    }

    setIsAnalyzingChain(true)
    setChainAnalysisError(null)

    try {
      const result = await analyzeNarratorChain(extractionData.narrators)
      setChainAnalysis(result)
      
      // Update individual analyses with chain results
      setNarratorAnalyses(result.individual_analyses)
      setNarratorOrder(result.chain)
    } catch (error) {
      setChainAnalysisError(error instanceof Error ? error.message : 'Failed to analyze chain')
    } finally {
      setIsAnalyzingChain(false)
    }
  }

  const clearNarratorAnalysis = (narratorName: string) => {
    setNarratorAnalyses(prev => {
      const newAnalyses = { ...prev }
      delete newAnalyses[narratorName]
      return newAnalyses
    })
    setMinimizedNarrators(prev => {
      const newMinimized = { ...prev }
      delete newMinimized[narratorName]
      return newMinimized
    })
    setNarratorOrder(prev => prev.filter(name => name !== narratorName))
  }

  const toggleMinimizeNarrator = (narratorName: string) => {
    setMinimizedNarrators(prev => ({
      ...prev,
      [narratorName]: !prev[narratorName]
    }))
  }

  const clearAllAnalyses = () => {
    setNarratorAnalyses({})
    setNarratorOrder([])
    setMinimizedNarrators({})
    setChainAnalysis(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-scholar-cream via-white to-sage-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 pattern-geometric-subtle py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-deep-blue dark:text-blue-400 hover:text-deep-blue-dark dark:hover:text-blue-300 mb-4 font-inter transition-colors duration-200">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold font-lora text-deep-blue dark:text-blue-400 mb-2 tracking-wide">Hadith Chain Analysis</h1>
          <div className="flex items-center space-x-4">
            <p className="text-scholar-gray-600 dark:text-gray-400 font-inter">Analysis mode: <span className="font-medium text-deep-blue dark:text-blue-400">Sunni</span></p>
            {authLoading ? (
              <span className="text-sm text-scholar-gray-500 dark:text-gray-500">Checking authentication...</span>
            ) : (
              <div className={`text-sm px-2 py-1 rounded-full ${isAuthenticated 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                {isAuthenticated ? 'Authenticated' : 'Please log in'}
              </div>
            )}
          </div>

          {/* Decorative divider */}
          <div className="flex justify-start mt-6">
            <div className="w-16 h-1 bg-gradient-to-r from-warm-tan to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Text */}
          <div className="lg:col-span-1">
            <Card variant="scholarly">
              <h2 className="text-xl font-semibold font-lora text-deep-blue dark:text-blue-400 mb-4">Input Text</h2>
              <div className="space-y-4">
                <textarea
                  value={hadithText}
                  onChange={(e) => setHadithText(e.target.value)}
                  placeholder="Enter the hadith text with its chain of narrators..."
                  className="w-full h-32 px-4 py-3 bg-sage-25 dark:bg-gray-700 border border-sage-100 dark:border-gray-600 rounded-lg focus:border-deep-blue dark:focus:border-blue-400 focus:ring-2 focus:ring-deep-blue/20 dark:focus:ring-blue-400/20 transition-colors duration-200 resize-none text-sm text-scholar-gray-700 dark:text-gray-300 font-inter leading-relaxed"
                  dir="rtl"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleExtractNarrators}
                    disabled={!hadithText.trim() || isExtracting || !isAuthenticated}
                    loading={isExtracting}
                    icon={MagnifyingGlassIcon}
                    iconPosition="left"
                    fullWidth
                  >
                    {isExtracting ? 'Analyzing...' : !isAuthenticated ? 'Login Required' : 'Analyze'}
                  </Button>
                  <Button
                    onClick={() => setHadithText('')}
                    variant="secondary"
                  >
                    Clear
                  </Button>
                </div>
              </div>
              
            </Card>

            {/* Extraction Results */}
            {hadithText && (
              <Card variant="scholarly" className="mt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-deep-blue/10 dark:bg-blue-400/10 p-2 rounded-lg mr-3 border border-deep-blue/20 dark:border-blue-400/20">
                    <UserIcon className="h-5 w-5 text-deep-blue dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold font-lora text-deep-blue dark:text-blue-400">Extracted Narrators</h2>
                </div>

                <LoadingState isLoading={isExtracting} message="Extracting narrators..." />

                {extractionError && (
                  <ErrorState 
                    message={extractionError} 
                    onRetry={handleExtractNarrators}
                  />
                )}

                {extractionData && extractionData.success && (
                  <div className="space-y-4">
                    {/* Sanad Chain */}
                    {extractionData.sanad_chain && (
                      <div className="bg-sage-25 dark:bg-gray-700 rounded-lg p-4 border border-sage-100 dark:border-gray-600">
                        <h3 className="text-sm font-semibold text-deep-blue dark:text-blue-400 mb-2 font-inter">Identified Chain:</h3>
                        <p className="text-scholar-gray-700 dark:text-gray-300 font-inter text-sm leading-relaxed">
                          {extractionData.sanad_chain}
                        </p>
                      </div>
                    )}

                    {/* Chain Analysis Button */}
                    <div className="flex gap-2">
                      <Button
                        onClick={handleAnalyzeChain}
                        disabled={isAnalyzingChain || !isAuthenticated}
                        loading={isAnalyzingChain}
                        icon={LinkIcon}
                        iconPosition="left"
                        variant="cta"
                        size="sm"
                      >
                        {!isAuthenticated ? 'Login Required' : 'Analyze Full Chain'}
                      </Button>
                    </div>

                    {chainAnalysisError && (
                      <ErrorState 
                        message={chainAnalysisError} 
                        onRetry={handleAnalyzeChain}
                      />
                    )}

                    {/* Chain Analysis Summary */}
                    {chainAnalysis && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                        <h3 className="text-sm font-semibold text-deep-blue dark:text-blue-400 mb-2 font-inter flex items-center">
                          <BeakerIcon className="h-4 w-4 mr-1" />
                          Chain Analysis Summary
                        </h3>
                        <div className="text-sm text-scholar-gray-700 dark:text-gray-300 space-y-1">
                          <div>Total Narrators: {chainAnalysis.metadata.total_narrators}</div>
                          <div>Successful Analyses: {chainAnalysis.metadata.successful_analyses}</div>
                          <div>Method: {chainAnalysis.metadata.analysis_method}</div>
                        </div>
                      </div>
                    )}

                    {/* Narrator List */}
                    <div>
                      <h3 className="text-sm font-semibold text-deep-blue dark:text-blue-400 mb-3 font-inter">
                        Narrators ({extractionData.narrators.length}):
                      </h3>
                      <div className="space-y-2">
                        {extractionData.narrators.map((narrator: string, index: number) => (
                          <div 
                            key={index}
                            className="flex items-center justify-between bg-white dark:bg-gray-700 border border-sage-200 dark:border-gray-600 rounded-lg p-3 hover:shadow-sm transition-shadow"
                          >
                            <span className="text-scholar-gray-700 dark:text-gray-300 font-inter font-medium">{narrator}</span>
                            <Button
                              onClick={() => handleAnalyzeNarrator(narrator)}
                              disabled={narratorAnalyses[narrator]?.isAnalyzing || !isAuthenticated}
                              loading={narratorAnalyses[narrator]?.isAnalyzing}
                              size="sm"
                              variant="primary"
                            >
                              {!isAuthenticated ? 'Login Required' : 'Analyze'}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-2">
            <Card variant="scholarly">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-deep-blue/10 dark:bg-blue-400/10 p-2 rounded-lg mr-3 border border-deep-blue/20 dark:border-blue-400/20">
                    <MagnifyingGlassIcon className="h-6 w-6 text-deep-blue dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold font-lora text-deep-blue dark:text-blue-400">Narrator Analysis Results</h2>
                </div>
                {Object.keys(narratorAnalyses).length > 0 && (
                  <Button
                    onClick={clearAllAnalyses}
                    variant="outline"
                    size="sm"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              
              {Object.keys(narratorAnalyses).length === 0 ? (
                <EmptyState
                  title="Ready for Analysis"
                  description="Select 'Analyze' next to any narrator to view detailed reliability assessment, or use 'Analyze Full Chain' for comprehensive analysis."
                  icon={BookOpenIcon}
                />
              ) : (
                <div className="space-y-6">
                  {narratorOrder
                    .filter(narratorName => narratorAnalyses[narratorName])
                    .map((narratorName) => (
                      <NarratorAnalysisCard
                        key={narratorName}
                        narratorName={narratorName}
                        analysis={narratorAnalyses[narratorName]}
                        isMinimized={minimizedNarrators[narratorName] || false}
                        onToggleMinimize={() => toggleMinimizeNarrator(narratorName)}
                        onRemove={() => clearNarratorAnalysis(narratorName)}
                      />
                    ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
