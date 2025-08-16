import { Step, AnimationDelay } from '@/types/common'
import IconWrapper from './IconWrapper'

interface StepCardProps extends Step {
  index?: number
  animationDelay?: AnimationDelay
}

// Constants to avoid repetition
const STEP_CARD_CLASSES = {
  container: 'text-center animate-slide-in-left',
  iconContainer: 'relative mb-8',
  iconWrapper: 'mx-auto mb-4 rounded-full',
  stepBadge: 'absolute -top-2 -right-2 bg-warm-tan-400 text-warm-tan-900 text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-soft',
  title: 'text-xl font-semibold text-scholarly mb-4 font-serif',
  description: 'text-scholarly-muted leading-relaxed'
} as const

export default function StepCard({ 
  step, 
  title, 
  description, 
  icon,
  index = 0,
  animationDelay = 1
}: StepCardProps) {
  return (
    <div className={`${STEP_CARD_CLASSES.container} animate-stagger-${animationDelay}`}>
      <div className={STEP_CARD_CLASSES.iconContainer}>
        <IconWrapper 
          icon={icon}
          size="lg"
          variant="primary"
          className={STEP_CARD_CLASSES.iconWrapper}
        />
        <div className={STEP_CARD_CLASSES.stepBadge}>
          {step}
        </div>
      </div>
      <h3 className={STEP_CARD_CLASSES.title}>
        {title}
      </h3>
      <p className={STEP_CARD_CLASSES.description}>
        {description}
      </p>
    </div>
  )
}
