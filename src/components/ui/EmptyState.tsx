import { ReactNode, ComponentType } from 'react'

interface EmptyStateProps {
  title: string
  description: string
  icon: ComponentType<{ className?: string }>
  action?: ReactNode
}

export default function EmptyState({ 
  title, 
  description, 
  icon: Icon, 
  action 
}: EmptyStateProps) {
  return (
    <div className=" bg-sage-50 dark:bg-gray-800 rounded-lg p-8 text-center border border-sage-200 dark:border-gray-600">
      <div className="bg-sage-100 dark:bg-gray-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <Icon className="h-8 w-8 text-sage-600 dark:text-gray-300" />
      </div>
      <h3 className="text-lg font-semibold font-lora text-deep-blue dark:text-blue-400 mb-2">{title}</h3>
      <p className="text-scholar-gray-500 dark:text-gray-400 font-inter mb-4">{description}</p>
      {action}
    </div>
  )
}
