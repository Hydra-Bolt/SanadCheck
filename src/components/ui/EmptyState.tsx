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
    <div className="bg-gradient-to-br from-sage-50 to-white rounded-lg p-8 text-center border border-sage-200">
      <div className="bg-sage-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <Icon className="h-8 w-8 text-sage-600" />
      </div>
      <h3 className="text-lg font-semibold font-lora text-deep-blue mb-2">{title}</h3>
      <p className="text-scholar-gray-500 font-inter mb-4">{description}</p>
      {action}
    </div>
  )
}
