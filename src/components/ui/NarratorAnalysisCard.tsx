import { 
  UserIcon, 
  ShieldCheckIcon, 
  BookOpenIcon, 
  ExclamationCircleIcon, 
  SparklesIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { Card, LoadingState, ErrorState, ReliabilityBadge, InfoSection } from '@/components/ui'
import { AnalyzeNarratorResponse } from '@/lib/api'

interface NarratorAnalysisCardProps {
  narratorName: string
  analysis: AnalyzeNarratorResponse & { isAnalyzing?: boolean }
  isMinimized: boolean
  onToggleMinimize: () => void
  onRemove: () => void
}

export default function NarratorAnalysisCard({
  narratorName,
  analysis,
  isMinimized,
  onToggleMinimize,
  onRemove
}: NarratorAnalysisCardProps) {
  if (isMinimized && analysis.success && !analysis.isAnalyzing) {
    return (
      <Card variant="gradient" padding="sm" className="transition-all duration-300 ease-in-out">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-deep-blue/10 dark:bg-deep-blue-400/20 p-2 rounded-lg border border-deep-blue/20 dark:border-deep-blue-400/30 transition-colors duration-200">
              <UserIcon className="h-4 w-4 text-deep-blue dark:text-deep-blue-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-lora text-deep-blue dark:text-deep-blue-300">{narratorName}</h3>
              <ReliabilityBadge grade={analysis.reliability_grade || ''} size="sm" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleMinimize}
              className="text-sage-600 dark:text-sage-400 hover:text-deep-blue dark:hover:text-deep-blue-300 transition-all duration-200 p-1 transform hover:scale-110"
              title="Expand details"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
            <button
              onClick={onRemove}
              className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200 p-1 transform hover:scale-110"
              title="Remove analysis"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card 
      variant="gradient" 
      className="transition-all duration-500 ease-in-out transform hover:shadow-md animate-fade-in-up"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-deep-blue/10 dark:bg-deep-blue-400/20 p-2 rounded-lg mr-3 border border-deep-blue/20 dark:border-deep-blue-400/30">
            <UserIcon className="h-5 w-5 text-deep-blue dark:text-deep-blue-300" />
          </div>
          <h3 className="text-lg font-bold font-lora text-deep-blue dark:text-deep-blue-300">{narratorName}</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {analysis.success && !analysis.isAnalyzing && (
            <button
              onClick={onToggleMinimize}
              className="text-sage-600 dark:text-sage-400 hover:text-deep-blue dark:hover:text-deep-blue-300 transition-all duration-200 p-1 transform hover:scale-110"
              title="Minimize to card"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onRemove}
            className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200 p-1 transform hover:scale-110"
            title="Remove analysis"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <LoadingState 
        isLoading={analysis.isAnalyzing || false} 
        message="Analyzing narrator..." 
      />

      {!analysis.success && !analysis.isAnalyzing && (
        <ErrorState message={analysis.message || 'Analysis failed'} />
      )}

      {analysis.success && !analysis.isAnalyzing && (
        <div className="space-y-4 animate-fade-in-up">
          {/* Reliability Grade */}
          <div className="flex items-center space-x-4 animate-slide-in-left">
            <ReliabilityBadge grade={analysis.reliability_grade || ''} />
            <span className="text-sm text-scholar-gray-600 dark:text-scholar-gray-400 font-inter">
              Confidence: <span className="font-medium">{analysis.confidence_level}</span>
            </span>
          </div>

          {/* Information Sections */}
          <div className="space-y-4">
            {analysis.biographical_info && (
              <InfoSection 
                title="Biographical Information" 
                icon={BookOpenIcon}
                variant="default"
              >
                {analysis.biographical_info}
              </InfoSection>
            )}

            {analysis.reasoning && (
              <InfoSection 
                title="Analysis Reasoning" 
                icon={ShieldCheckIcon}
                variant="blue"
              >
                {analysis.reasoning}
              </InfoSection>
            )}

            {analysis.scholarly_consensus && (
              <InfoSection 
                title="Scholarly Consensus" 
                icon={UserIcon}
                variant="tan"
              >
                {analysis.scholarly_consensus}
              </InfoSection>
            )}

            {analysis.known_issues && (
              <InfoSection 
                title="Known Issues" 
                icon={ExclamationCircleIcon}
                variant="orange"
              >
                {analysis.known_issues}
              </InfoSection>
            )}

            {analysis.recommendation && (
              <InfoSection 
                title="Recommendation" 
                icon={SparklesIcon}
                variant="green"
              >
                <div className="font-medium">{analysis.recommendation}</div>
              </InfoSection>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
