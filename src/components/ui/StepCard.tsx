import { Step, AnimationDelay } from '@/types/common'

interface StepCardProps extends Step {
  index?: number
  animationDelay?: AnimationDelay
}

export default function StepCard({ 
  step, 
  title, 
  description, 
  icon: Icon,
  index = 0,
  animationDelay = 1
}: StepCardProps) {
  return (
    <div className={`text-center animate-slide-in-left animate-stagger-${animationDelay}`}>
      <div className="relative mb-8">
        <div className="bg-gradient-to-br from-deep-blue-800 to-deep-blue-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-elegant">
          <Icon className="h-8 w-8" />
        </div>
        <div className="absolute -top-2 -right-2 bg-warm-tan-400 text-warm-tan-900 text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-soft">
          {step}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-scholarly mb-4 font-serif">
        {title}
      </h3>
      <p className="text-scholarly-muted leading-relaxed">
        {description}
      </p>
    </div>
  )
}
