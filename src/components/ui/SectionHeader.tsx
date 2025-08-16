interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  animationDelay?: number
}

export default function SectionHeader({ 
  title, 
  subtitle, 
  centered = true,
  animationDelay = 0 
}: SectionHeaderProps) {
  const alignmentClass = centered ? 'text-center' : 'text-left'
  const animationClass = animationDelay > 0 ? `animate-stagger-${animationDelay}` : 'animate-fade-in-up'

  return (
    <div className={`mb-16 ${alignmentClass} ${animationClass}`}>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="divider-pattern w-32 mx-auto mt-8 animate-stagger-3"></div>
    </div>
  )
}
