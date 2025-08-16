import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
  retryLabel?: string
}

export default function ErrorState({ 
  message, 
  onRetry, 
  retryLabel = 'Try again' 
}: ErrorStateProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center">
        <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
        <div className="flex-1">
          <span className="text-red-700 font-inter">{message}</span>
          {onRetry && (
            <button
              onClick={onRetry}
              className="ml-4 text-red-600 hover:text-red-800 underline text-sm font-medium"
            >
              {retryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
