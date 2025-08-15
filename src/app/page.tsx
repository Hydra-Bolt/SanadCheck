'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  MagnifyingGlassIcon, 
  BookOpenIcon, 
  ShieldCheckIcon, 
  LinkIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export default function HomePage() {


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section with Enhanced Scholarly Design */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-pattern-islamic opacity-30 dark:opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-warm-tan-100/20 via-transparent to-deep-blue-100/20 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center animate-text-reveal">
            <div className="flex justify-center mb-8 animate-float">
              <div className="bg-gradient-to-br from-deep-blue-800 to-deep-blue-900 dark:from-blue-600 dark:to-blue-700 p-4 rounded-xl shadow-elegant">
                <BookOpenIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 font-serif animate-stagger-1">
              <span className="gradient-text">SanadCheck</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-stagger-2">
              Authenticate hadith chains with AI-powered analysis using traditional Islamic scholarship
            </p>
            
            <div className="divider-pattern w-32 mx-auto mb-8 animate-stagger-3"></div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-stagger-4">
              <button 
                onClick={() => document.getElementById('analysis-tool')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary group flex items-center justify-center"
              >
                <span>Try Analysis Tool</span>
                <ArrowRightIcon className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              <Link href="/methodology" className="btn-secondary">
                Learn Methodology
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
              Why Choose SanadCheck?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform combines traditional Islamic scholarship with modern technology to provide 
              comprehensive hadith authentication
            </p>
            <div className="divider-pattern w-32 mx-auto m-8 animate-stagger-3"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((feature, index) => (
                <div 
                key={feature.title} 
                className={`bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-6 transition-all duration-300 hover:shadow-lg animate-stagger-${index + 1}`}
                >
                <div className="mb-4 flex">
                  <span className={`inline-flex bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-lg p-3`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 font-serif">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
              How SanadCheck Works
            </h2>
            <p className="text-lg text-scholarly-muted max-w-3xl mx-auto">
              Our AI-powered system follows traditional hadith authentication methodologies 
              to analyze narrator chains
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
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
            ].map((step, index) => (
              <div key={step.step} className={`text-center animate-slide-in-left animate-stagger-${index + 1}`}>
                <div className="relative mb-8">
                  <div className="bg-gradient-to-br from-deep-blue-800 to-deep-blue-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-elegant">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-warm-tan-400 text-warm-tan-900 text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-soft">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-scholarly mb-4 font-serif">{step.title}</h3>
                <p className="text-scholarly-muted leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-deep-blue-800 to-deep-blue-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="animate-scale-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-serif text-white">
              Start Authenticating Hadith Today
            </h2>
            <p className="text-xl text-deep-blue-100 mb-8 max-w-2xl mx-auto">
              Join researchers and students worldwide who trust SanadCheck for authentic hadith analysis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('analysis-tool')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-deep-blue-800 hover:bg-warm-tan-50 font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Try Free Analysis
              </button>
                <Link 
                href="/about" 
                className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-8 rounded-lg border border-white transition-all duration-200"
                >
                Learn More
                </Link>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  )
}
