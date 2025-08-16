import { BeakerIcon, ChartBarIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { Card, ReliabilityBadge } from '@/components/ui'
import { AnalyzeNarratorChainResponse } from '@/lib/api'

interface ChainAnalysisDisplayProps {
  chainAnalysis: AnalyzeNarratorChainResponse
}

export default function ChainAnalysisDisplay({ chainAnalysis }: ChainAnalysisDisplayProps) {
  const { chain, individual_analyses, chain_synthesis, metadata } = chainAnalysis

  // Calculate overall chain strength
  const getChainStrength = () => {
    const reliableCount = Object.values(individual_analyses).filter(
      analysis => analysis.reliability_grade?.toLowerCase().includes('thiqah') || 
                  analysis.reliability_grade?.toLowerCase().includes('reliable')
    ).length

    const weakCount = Object.values(individual_analyses).filter(
      analysis => analysis.reliability_grade?.toLowerCase().includes('da\'if') ||
                  analysis.reliability_grade?.toLowerCase().includes('weak')
    ).length

    if (weakCount > 0) return 'weak'
    if (reliableCount === Object.keys(individual_analyses).length) return 'strong'
    return 'moderate'
  }

  const chainStrength = getChainStrength()

  const strengthConfig = {
    strong: {
      color: 'text-green-700 bg-green-50 border-green-200',
      icon: CheckCircleIcon,
      label: 'Strong Chain'
    },
    moderate: {
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      icon: ChartBarIcon,
      label: 'Moderate Chain'
    },
    weak: {
      color: 'text-red-700 bg-red-50 border-red-200',
      icon: ExclamationTriangleIcon,
      label: 'Weak Chain'
    }
  }

  const config = strengthConfig[chainStrength]

  return (
    <Card variant="gradient" className="mt-6">
      <div className="flex items-center mb-6">
        <div className="bg-deep-blue/10 p-3 rounded-lg mr-4 border border-deep-blue/20">
          <BeakerIcon className="h-6 w-6 text-deep-blue" />
        </div>
        <div>
          <h2 className="text-xl font-semibold font-lora text-deep-blue">Chain Analysis Results</h2>
          <p className="text-sm text-scholar-gray-600 font-inter">Comprehensive evaluation of the narrator chain</p>
        </div>
      </div>

      {/* Overall Chain Assessment */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold border flex items-center ${config.color}`}>
            <config.icon className="h-4 w-4 mr-2" />
            {config.label}
          </span>
          <div className="text-sm text-scholar-gray-600 font-inter">
            <span className="font-medium">{metadata.successful_analyses}</span> of {metadata.total_narrators} narrators analyzed
          </div>
        </div>
      </div>

      {/* Chain Flow Visualization */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold font-lora text-deep-blue mb-4">Chain Flow</h3>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {chain.map((narrator, index) => {
            const analysis = individual_analyses[narrator]
            return (
              <div key={index} className="flex items-center">
                <div className="text-center min-w-0 flex-shrink-0">
                  <div className="bg-white border border-sage-200 rounded-lg p-3 shadow-sm">
                    <div className="text-xs font-medium text-deep-blue mb-1 truncate max-w-24" title={narrator}>
                      {narrator}
                    </div>
                    {analysis && analysis.reliability_grade && (
                      <ReliabilityBadge grade={analysis.reliability_grade} size="sm" />
                    )}
                  </div>
                </div>
                {index < chain.length - 1 && (
                  <div className="flex-shrink-0 mx-2">
                    <div className="w-6 h-0.5 bg-sage-300"></div>
                    <div className="w-0 h-0 border-l-4 border-l-sage-300 border-t-2 border-t-transparent border-b-2 border-b-transparent ml-auto"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Analysis Summary */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-sage-50 rounded-lg p-4 border border-sage-100">
          <h4 className="text-sm font-semibold text-deep-blue mb-2 font-inter">Analysis Metadata</h4>
          <div className="space-y-1 text-sm text-scholar-gray-700">
            <div>Method: <span className="font-medium">{metadata.analysis_method}</span></div>
            <div>Total Narrators: <span className="font-medium">{metadata.total_narrators}</span></div>
            <div>Success Rate: <span className="font-medium">
              {Math.round((metadata.successful_analyses / metadata.total_narrators) * 100)}%
            </span></div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <h4 className="text-sm font-semibold text-deep-blue mb-2 font-inter">Chain Characteristics</h4>
          <div className="space-y-1 text-sm text-scholar-gray-700">
            <div>Chain Length: <span className="font-medium">{chain.length} narrators</span></div>
            <div>Reliability: <span className="font-medium">{config.label}</span></div>
            {Object.keys(chain_synthesis).length > 0 && (
              <div>Synthesis Available: <span className="font-medium">Yes</span></div>
            )}
          </div>
        </div>
      </div>

      {/* Chain Synthesis */}
      {Object.keys(chain_synthesis).length > 0 && (
        <div className="bg-warm-tan-50 rounded-lg p-4 border border-warm-tan-200">
          <h4 className="text-sm font-semibold text-deep-blue mb-3 font-inter">Chain Synthesis</h4>
          <div className="space-y-2">
            {Object.entries(chain_synthesis).map(([key, value]) => (
              <div key={key} className="text-sm">
                <span className="font-medium text-deep-blue">{key}:</span>
                <span className="text-scholar-gray-700 ml-2">
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
