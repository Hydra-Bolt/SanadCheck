import { ComponentType } from 'react'

export interface Feature {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  color: 'deep-blue' | 'muted-green' | 'warm-tan'
}

export interface Step {
  step: string
  title: string
  description: string
  icon: ComponentType<{ className?: string }>
}

export interface ColorVariant {
  background: string
  text: string
  border?: string
}

export interface ButtonVariant {
  primary: string
  secondary: string
  outline: string
}

export type AnimationDelay = 1 | 2 | 3 | 4 | 5 | 6
