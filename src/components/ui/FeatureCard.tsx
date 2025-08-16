import { Feature, AnimationDelay } from '@/types/common'

interface FeatureCardProps extends Feature {
  index?: number
  animationDelay?: AnimationDelay
}

export default function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  color,
  index = 0,
  animationDelay = 1
}: FeatureCardProps) {
  return (
    <div 
      className={`bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-6 transition-all duration-300 hover:shadow-lg animate-stagger-${animationDelay}`}
    >
      <div className="mb-4 flex">
        <span className={`inline-flex bg-${color}-100 dark:bg-${color}-900/30 rounded-lg p-3`}>
          <Icon className={`h-6 w-6 text-${color}-600 dark:text-${color}-400`} />
        </span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 font-serif">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
