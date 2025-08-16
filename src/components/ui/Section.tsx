import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  background?: 'white' | 'gray' | 'gradient'
  padding?: 'normal' | 'large'
  id?: string
}

const backgroundClasses = {
  white: 'bg-white dark:bg-gray-900',
  gray: 'bg-gray-50 dark:bg-gray-800',
  gradient: 'bg-gradient-to-r from-deep-blue-800 to-deep-blue-900'
}

const paddingClasses = {
  normal: 'py-20',
  large: 'py-20 lg:py-32'
}

export default function Section({ 
  children, 
  className = '', 
  background = 'white',
  padding = 'normal',
  id 
}: SectionProps) {
  return (
    <section 
      id={id}
      className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
