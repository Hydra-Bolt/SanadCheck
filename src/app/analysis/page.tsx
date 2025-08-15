'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeftIcon, 
  MagnifyingGlassIcon, 
  CheckCircleIcon,
  ExclamationCircleIcon,
  ShieldCheckIcon,
  UserIcon,
  ClockIcon,
  SparklesIcon,
  BookOpenIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { extractNarrators, analyzeNarrator, ExtractNarratorsResponse, AnalyzeNarratorResponse } from '../../lib/api'

interface NarratorAnalysis {
  narrator_name?: string
  reliability_grade?: string
  confidence_level?: string
  reasoning?: string
  scholarly_consensus?: string
  known_issues?: string
  biographical_info?: string
  recommendation?: string
  success?: boolean
  message?: string
  isAnalyzing?: boolean
}

export default function AnalysisPage() {
  const searchParams = useSearchParams()
  const analysisMode = searchParams?.get('mode') || 'both'

  const [hadithText, setHadithText] = useState('')
  const [extractionData, setExtractionData] = useState<ExtractNarratorsResponse | null>(null)
  const [narratorAnalyses, setNarratorAnalyses] = useState<Record<string, NarratorAnalysis>>({})
  const [narratorOrder, setNarratorOrder] = useState<string[]>([])
  const [minimizedNarrators, setMinimizedNarrators] = useState<Record<string, boolean>>({})
  const [isExtracting, setIsExtracting] = useState(false)
  const [extractionError, setExtractionError] = useState<string | null>(null)

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
      setExtractionError(null)
    }
  }, [hadithText])

  const handleExtractNarrators = async () => {
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

  const getReliabilityColor = (grade: string) => {
    switch (grade.toLowerCase()) {
      case 'thiqah':
      case 'reliable':
      case 'trustworthy':
        return 'text-green-700 bg-green-50 border-green-200'
      case 'saduq':
      case 'good':
        return 'text-blue-700 bg-blue-50 border-blue-200'
      case 'da\'if':
      case 'weak':
        return 'text-orange-700 bg-orange-50 border-orange-200'
      case 'matruk':
      case 'rejected':
        return 'text-red-700 bg-red-50 border-red-200'
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200'
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-scholar-cream via-white to-sage-50 pattern-geometric-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-deep-blue hover:text-deep-blue-dark mb-4 font-inter transition-colors duration-200">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold font-lora text-deep-blue mb-2 tracking-wide">Hadith Chain Analysis</h1>
          <p className="text-scholar-gray-600 font-inter">Analysis mode: <span className="font-medium text-deep-blue">{analysisMode}</span></p>
          
          {/* Decorative divider */}
          <div className="flex justify-start mt-6">
            <div className="w-16 h-1 bg-gradient-to-r from-warm-tan to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Text */}
          <div className="lg:col-span-1">
            <div className="scholarly-card bg-white border border-sage-200">
              <h2 className="text-xl font-semibold font-lora text-deep-blue mb-4">Input Text</h2>
              <div className="space-y-4">
                <textarea
                  value={hadithText}
                  onChange={(e) => setHadithText(e.target.value)}
                  placeholder="Enter the hadith text with its chain of narrators..."
                  className="w-full h-32 px-4 py-3 bg-sage-25 border border-sage-100 rounded-lg focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 transition-colors duration-200 resize-none text-sm text-scholar-gray-700 font-inter leading-relaxed"
                  dir="rtl"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleExtractNarrators()}
                    disabled={!hadithText.trim() || isExtracting}
                    className="flex-1 bg-deep-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-deep-blue-dark transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-inter flex items-center justify-center"
                  >
                    {isExtracting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                        Analyze
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setHadithText('')}
                    className="bg-sage-100 text-sage-700 font-semibold py-2 px-4 rounded-lg hover:bg-sage-200 transition-all duration-200 text-sm font-inter"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Extraction Results */}
            {hadithText && (
              <div className="scholarly-card bg-white border border-sage-200 mt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-deep-blue/10 p-2 rounded-lg mr-3 border border-deep-blue/20">
                    <UserIcon className="h-5 w-5 text-deep-blue" />
                  </div>
                  <h2 className="text-xl font-semibold font-lora text-deep-blue">Extracted Narrators</h2>
                </div>

                {isExtracting && (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-deep-blue"></div>
                    <span className="ml-3 text-scholar-gray-600 font-inter">Extracting narrators...</span>
                  </div>
                )}

                {extractionError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-red-700 font-inter">{extractionError}</span>
                    </div>
                  </div>
                )}

                {extractionData && extractionData.success && (
                  <div className="space-y-4">
                    {/* Sanad Chain */}
                    {extractionData.sanad_chain && (
                      <div className="bg-sage-25 rounded-lg p-4 border border-sage-100">
                        <h3 className="text-sm font-semibold text-deep-blue mb-2 font-inter">Identified Chain:</h3>
                        <p className="text-scholar-gray-700 font-inter text-sm leading-relaxed">
                          {extractionData.sanad_chain}
                        </p>
                      </div>
                    )}

                    {/* Narrator List */}
                    <div>
                      <h3 className="text-sm font-semibold text-deep-blue mb-3 font-inter">
                        Narrators ({extractionData.narrators.length}):
                      </h3>
                      <div className="space-y-2">
                        {extractionData.narrators.map((narrator: string, index: number) => (
                          <div 
                            key={index}
                            className="flex items-center justify-between bg-white border border-sage-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
                          >
                            <span className="text-scholar-gray-700 font-inter font-medium">{narrator}</span>
                            <button
                              onClick={() => handleAnalyzeNarrator(narrator)}
                              disabled={narratorAnalyses[narrator]?.isAnalyzing}
                              className="text-xs bg-deep-blue text-white px-3 py-1 rounded-full hover:bg-deep-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-inter"
                            >
                              {narratorAnalyses[narrator]?.isAnalyzing ? 'Analyzing...' : 'Analyze'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-2">
            <div className="scholarly-card bg-white border border-sage-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-deep-blue/10 p-2 rounded-lg mr-3 border border-deep-blue/20">
                    <MagnifyingGlassIcon className="h-6 w-6 text-deep-blue" />
                  </div>
                  <h2 className="text-xl font-semibold font-lora text-deep-blue">Narrator Analysis Results</h2>
                </div>
                {Object.keys(narratorAnalyses).length > 0 && (
                  <button
                    onClick={clearAllAnalyses}
                    className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors font-inter flex items-center"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              {Object.keys(narratorAnalyses).length === 0 ? (
                <div className="bg-gradient-to-br from-sage-50 to-white rounded-lg p-8 text-center border border-sage-200">
                  <div className="bg-sage-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <BookOpenIcon className="h-8 w-8 text-sage-600" />
                  </div>
                  <h3 className="text-lg font-semibold font-lora text-deep-blue mb-2">Ready for Analysis</h3>
                  <p className="text-scholar-gray-500 font-inter">
                    Select "Analyze" next to any narrator to view detailed reliability assessment
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {narratorOrder
                    .filter(narratorName => narratorAnalyses[narratorName])
                    .map((narratorName) => {
                      const analysis = narratorAnalyses[narratorName]
                      return (
                    <div 
                      key={narratorName} 
                      className="border border-sage-200 rounded-xl bg-gradient-to-br from-white to-sage-25 transition-all duration-500 ease-in-out transform hover:shadow-md animate-fade-in-up"
                    >
                      {/* Minimized Card View */}
                      {minimizedNarrators[narratorName] && analysis.success && !analysis.isAnalyzing ? (
                        <div className="p-4 transition-all duration-300 ease-in-out">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="bg-deep-blue/10 p-2 rounded-lg border border-deep-blue/20 transition-colors duration-200">
                                <UserIcon className="h-4 w-4 text-deep-blue" />
                              </div>
                              <div>
                                <h3 className="text-sm font-bold font-lora text-deep-blue">{narratorName}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${getReliabilityColor(analysis.reliability_grade || '')}`}>
                                  {analysis.reliability_grade}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => toggleMinimizeNarrator(narratorName)}
                                className="text-sage-600 hover:text-deep-blue transition-all duration-200 p-1 transform hover:scale-110"
                                title="Expand details"
                              >
                                <PlusIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => clearNarratorAnalysis(narratorName)}
                                className="text-red-500 hover:text-red-700 transition-all duration-200 p-1 transform hover:scale-110"
                                title="Remove analysis"
                              >
                                <XMarkIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Full Analysis View */
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          minimizedNarrators[narratorName] 
                            ? 'max-h-0 opacity-0 p-0' 
                            : 'max-h-[2000px] opacity-100 p-6'
                        }`}>
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                              <div className="bg-deep-blue/10 p-2 rounded-lg mr-3 border border-deep-blue/20">
                                <UserIcon className="h-5 w-5 text-deep-blue" />
                              </div>
                              <h3 className="text-lg font-bold font-lora text-deep-blue">{narratorName}</h3>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {analysis.success && !analysis.isAnalyzing && (
                                <button
                                  onClick={() => toggleMinimizeNarrator(narratorName)}
                                  className="text-sage-600 hover:text-deep-blue transition-all duration-200 p-1 transform hover:scale-110"
                                  title="Minimize to card"
                                >
                                  <MinusIcon className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                onClick={() => clearNarratorAnalysis(narratorName)}
                                className="text-red-500 hover:text-red-700 transition-all duration-200 p-1 transform hover:scale-110"
                                title="Remove analysis"
                              >
                                <XMarkIcon className="h-4 w-4" />
                              </button>
                              {analysis.isAnalyzing && (
                                <div className="flex items-center animate-fade-in-up">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-deep-blue mr-2"></div>
                                  <span className="text-sm text-scholar-gray-600 font-inter">Analyzing...</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {analysis.success && !analysis.isAnalyzing && (
                            <div className="space-y-4 animate-fade-in-up">
                              {/* Reliability Grade */}
                              <div className="flex items-center space-x-4 animate-slide-in-left">
                                <span className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${getReliabilityColor(analysis.reliability_grade || '')}`}>
                                  {analysis.reliability_grade}
                                </span>
                                <span className="text-sm text-scholar-gray-600 font-inter">
                                  Confidence: <span className="font-medium">{analysis.confidence_level}</span>
                                </span>
                              </div>

                              {/* Biographical Info */}
                              {analysis.biographical_info && (
                                <div className="bg-sage-50 rounded-lg p-4 border border-sage-100 animate-fade-in-up transition-all duration-200 hover:shadow-sm">
                                  <h4 className="text-sm font-semibold text-deep-blue mb-2 font-inter flex items-center">
                                    <BookOpenIcon className="h-4 w-4 mr-1" />
                                    Biographical Information
                                  </h4>
                                  <p className="text-scholar-gray-700 text-sm leading-relaxed font-inter">
                                    {analysis.biographical_info}
                                  </p>
                                </div>
                              )}

                              {/* Reasoning */}
                              {analysis.reasoning && (
                                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 animate-fade-in-up transition-all duration-200 hover:shadow-sm">
                                  <h4 className="text-sm font-semibold text-deep-blue mb-2 font-inter flex items-center">
                                    <ShieldCheckIcon className="h-4 w-4 mr-1" />
                                    Analysis Reasoning
                                  </h4>
                                  <p className="text-scholar-gray-700 text-sm leading-relaxed font-inter">
                                    {analysis.reasoning}
                                  </p>
                                </div>
                              )}

                              {/* Scholarly Consensus */}
                              {analysis.scholarly_consensus && (
                                <div className="bg-warm-tan-50 rounded-lg p-4 border border-warm-tan-200 animate-fade-in-up transition-all duration-200 hover:shadow-sm">
                                  <h4 className="text-sm font-semibold text-deep-blue mb-2 font-inter flex items-center">
                                    <UserIcon className="h-4 w-4 mr-1" />
                                    Scholarly Consensus
                                  </h4>
                                  <p className="text-scholar-gray-700 text-sm leading-relaxed font-inter">
                                    {analysis.scholarly_consensus}
                                  </p>
                                </div>
                              )}

                              {/* Known Issues */}
                              {analysis.known_issues && (
                                <div className="bg-orange-50 rounded-lg p-4 border border-orange-100 animate-fade-in-up transition-all duration-200 hover:shadow-sm">
                                  <h4 className="text-sm font-semibold text-deep-blue mb-2 font-inter flex items-center">
                                    <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                                    Known Issues
                                  </h4>
                                  <p className="text-scholar-gray-700 text-sm leading-relaxed font-inter">
                                    {analysis.known_issues}
                                  </p>
                                </div>
                              )}

                              {/* Recommendation */}
                              {analysis.recommendation && (
                                <div className="bg-gradient-to-r from-deep-blue-50 to-sage-50 rounded-lg p-4 border border-deep-blue-100 animate-fade-in-up transition-all duration-200 hover:shadow-sm">
                                  <h4 className="text-sm font-semibold text-deep-blue mb-2 font-inter flex items-center">
                                    <SparklesIcon className="h-4 w-4 mr-1" />
                                    Recommendation
                                  </h4>
                                  <p className="text-scholar-gray-700 text-sm leading-relaxed font-inter font-medium">
                                    {analysis.recommendation}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {!analysis.success && !analysis.isAnalyzing && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                              <div className="flex items-center">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                                <span className="text-red-700 font-inter">{analysis.message || 'Analysis failed'}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                      )
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
