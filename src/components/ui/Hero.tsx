"use client";

import { ReactNode } from 'react'
import IconWrapper from './IconWrapper'
import Button from './Button'
import Link from 'next/link'
import { ArrowRightIcon, BookOpenIcon } from '@heroicons/react/24/outline'

interface HeroProps {
  title: string
  subtitle: string
  primaryAction?: {
    text: string
    href: string
  }
  secondaryAction?: {
    text: string
    href: string
  }
  icon?: React.ComponentType<{ className?: string }>
  children?: ReactNode
}

export default function Hero({ 
  title, 
  subtitle, 
  primaryAction,
  secondaryAction,
  icon: HeroIcon = BookOpenIcon,
  children,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 
                     bg-gradient-to-br from-deep-blue-900 via-deep-blue-800 to-deep-blue-900 
                     dark:from-scholar-gray-900 dark:via-scholar-gray-800 dark:to-deep-blue-900">
      {/* Background patterns and overlays */}
      <div className="absolute inset-0 bg-pattern-islamic opacity-10 dark:opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-deep-blue-900/20 via-transparent to-deep-blue-900/20 
                      dark:from-scholar-gray-900/30 dark:via-transparent dark:to-deep-blue-900/30"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center animate-text-reveal">
          <div className="flex justify-center mb-8 animate-float">
            <IconWrapper 
              icon={HeroIcon}
              size="lg"
              variant="primary"
              className="p-4"
            />
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 font-serif animate-stagger-1">
            <span className="text-white">{title}</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 dark:text-scholar-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-stagger-2">
            {subtitle}
          </p>
          
          <div className="divider-pattern w-32 mx-auto mb-8 animate-stagger-3"></div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-stagger-4">
            {primaryAction && (
              <Button
                onClick={() => window.location.href = primaryAction.href}
                variant="primary"
                icon={ArrowRightIcon}
                iconPosition="right"
                className="group"
              >
                {primaryAction.text}
              </Button>
            )}
            {secondaryAction && (
              <Link href={secondaryAction.href} className="btn-secondary">
                {secondaryAction.text}
              </Link>
            )}
          </div>
          
          {children}
        </div>
      </div>
    </section>
  )
}
