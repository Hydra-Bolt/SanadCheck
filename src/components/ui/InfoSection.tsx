import { ReactNode, ComponentType } from 'react'

interface InfoSectionProps {
  title: string
  children: ReactNode
  icon?: ComponentType<{ className?: string }>
  variant?: 'default' | 'blue' | 'orange' | 'green' | 'tan'
}

const variantClasses = {
  default: 'bg-sage-50 border-sage-100',
  blue: 'bg-blue-50 border-blue-100',
  orange: 'bg-orange-50 border-orange-100',
  green: 'bg-green-50 border-green-100',
  tan: 'bg-warm-tan-50 border-warm-tan-200'
}

export default function InfoSection({ 
  title, 
  children, 
  icon: Icon, 
  variant = 'default' 
}: InfoSectionProps) {
  return (
    <div className={`rounded-lg p-4 border transition-all duration-200 hover:shadow-sm ${variantClasses[variant]}`}>
      <h4 className="text-sm font-semibold text-deep-blue mb-2 font-inter flex items-center">
        {Icon && <Icon className="h-4 w-4 mr-1" />}
        {title}
      </h4>
      <div className="text-scholar-gray-700 text-sm leading-relaxed font-inter">
        {children}
      </div>
    </div>
  )
}
