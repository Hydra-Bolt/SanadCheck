import {
  ShieldCheckIcon,
  GlobeAltIcon,
  ClockIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  UserGroupIcon,
  LinkIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { Feature, Step } from '@/types/common'

export const FEATURES: Feature[] = [
  {
    icon: ShieldCheckIcon,
    title: 'Authentic Analysis',
    description: 'Based on classical rijāl criticism from authoritative Islamic sources',
    color: 'deep-blue'
  },
  {
    icon: GlobeAltIcon,
    title: 'Dual Methodology',
    description: 'Comprehensive analysis using both Sunni and Shia scholarly traditions',
    color: 'muted-green'
  },
  {
    icon: ClockIcon,
    title: 'Instant Results',
    description: 'Get detailed analysis in seconds instead of hours of manual research',
    color: 'warm-tan'
  },
  {
    icon: DocumentTextIcon,
    title: 'Detailed Reports',
    description: 'Complete breakdown with source references and scholarly opinions',
    color: 'deep-blue'
  },
  {
    icon: AcademicCapIcon,
    title: 'Educational',
    description: 'Learn about hadith science and narrator criticism methodologies',
    color: 'muted-green'
  },
  {
    icon: UserGroupIcon,
    title: 'Scholar Verified',
    description: 'Methodology reviewed and validated by Islamic scholarship experts',
    color: 'warm-tan'
  }
]

export const STEPS: Step[] = [
  {
    step: '01',
    title: 'Submit Chain',
    description: 'Enter the hadith chain of narrators you want to authenticate',
    icon: LinkIcon
  },
  {
    step: '02',
    title: 'AI Analysis',
    description: 'Our system analyzes each narrator using classical scholarship databases',
    icon: SparklesIcon
  },
  {
    step: '03',
    title: 'Get Results',
    description: 'Receive detailed analysis with authenticity assessment and sources',
    icon: DocumentTextIcon
  }
]
