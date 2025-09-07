'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BookOpenIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { 
  Hero, 
  Section, 
  SectionHeader, 
  FeatureCard, 
  StepCard, 
  Button,
  IconWrapper
} from '@/components/ui'
import { FEATURES, STEPS } from '@/constants/homepage'
import { useAuth } from '@/contexts/AuthContext'
import { AuthModal } from '@/components/auth/AuthModal'

export default function HomePage() {
  const { isAuthenticated, user } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handlePrimaryAction = () => {
    if (isAuthenticated) {
      // User is authenticated, go to analysis page
      window.location.href = '/analysis'
    } else {
      // User not authenticated, show login modal
      setShowAuthModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section with Spotlight Effect */}
      <Hero
        title="SanadCheck"
        subtitle={
          isAuthenticated 
            ? `Welcome back, ${user?.full_name || user?.username}! Continue your hadith analysis.`
            : "Authenticate hadith chains with AI-powered analysis using traditional Islamic scholarship"
        }
        icon={BookOpenIcon}
      >
        {/* Custom button handling */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="cta" 
            size="lg"
            onClick={handlePrimaryAction}
            className="min-w-[200px]"
          >
            {isAuthenticated ? "Continue Analysis" : "Try Analysis Tool"}
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Button>
          
          <Link href={isAuthenticated ? "/dashboard" : "/methodology"}>
            <Button variant="outline" size="lg" className="min-w-[200px]">
              {isAuthenticated ? "View Dashboard" : "Learn Methodology"}
            </Button>
          </Link>
        </div>
      </Hero>
      
      {/* Features Section */}
      <Section background="gray">
        <SectionHeader
          title="Why Choose SanadCheck?"
          subtitle="Our platform combines traditional Islamic scholarship with modern technology to provide comprehensive hadith authentication"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              animationDelay={(index + 1) as 1 | 2 | 3 | 4 | 5 | 6}
            />
          ))}
        </div>
      </Section>

      {/* How It Works Section */}
      <Section background="white">
        <SectionHeader
          title="How SanadCheck Works"
          subtitle="Our AI-powered system follows traditional hadith authentication methodologies to analyze narrator chains"
        />

        <div className="grid lg:grid-cols-3 gap-12">
          {STEPS.map((step, index) => (
            <StepCard
              key={step.step}
              {...step}
              animationDelay={(index + 1) as 1 | 2 | 3}
            />
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="gradient" className="text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-scale-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-serif text-white">
              Start Authenticating Hadith Today
            </h2>
            <p className="text-xl text-deep-blue-100 mb-8 max-w-2xl mx-auto">
              Join researchers and students worldwide who trust SanadCheck for authentic hadith analysis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.href = "/analysis"}
                variant="cta"
                size="lg"
              >
                Try Free Analysis
              </Button>
              <Link 
                href="/about" 
                className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-8 rounded-lg border border-white transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode="login"
      />
    </div>
  )
}
