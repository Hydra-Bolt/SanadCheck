import './globals.css'
import { Inter, Lora } from 'next/font/google'
import Link from 'next/link'
import { MagnifyingGlassIcon, BookOpenIcon, QuestionMarkCircleIcon, InformationCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { ThemeProvider } from '@/contexts/ThemeContext'
import ThemeToggle from '@/components/ThemeToggle'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })

export const metadata = {
  title: 'SanadCheck - Hadith Chain Analysis Tool',
  description: 'Analyze Hadith chains instantly. Verify narrators from Sunni and Shia sources with AI-powered analysis.',
  keywords: ['hadith', 'analysis', 'sunni', 'shia', 'narrators', 'verification', 'islamic', 'scholars'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`h-full ${inter.variable} ${lora.variable}`}>
      <body className={`h-full font-sans bg-white dark:bg-gray-900 transition-colors duration-300`}>
        <ThemeProvider defaultTheme="light">
          {/* Navigation Header */}
          <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-deep-blue-800 to-deep-blue-900 dark:from-blue-600 dark:to-blue-700 p-2 rounded-lg shadow-md">
                  <BookOpenIcon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-deep-blue-900 to-deep-blue-700 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                  SanadCheck
                </span>
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  href="/analysis"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-deep-blue-700 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                  <MagnifyingGlassIcon className="h-4 w-4" />
                  <span>Analysis</span>
                </Link>
                <Link
                  href="/methodology"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-deep-blue-700 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                  <Cog6ToothIcon className="h-4 w-4" />
                  <span>Methodology</span>
                </Link>
                <Link
                  href="/glossary"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-deep-blue-700 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                  <BookOpenIcon className="h-4 w-4" />
                  <span>Glossary</span>
                </Link>
                <Link
                  href="/faq"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-deep-blue-700 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                  <QuestionMarkCircleIcon className="h-4 w-4" />
                  <span>FAQ</span>
                </Link>
                <Link
                  href="/about"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-deep-blue-700 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                  <InformationCircleIcon className="h-4 w-4" />
                  <span>About</span>
                </Link>
                
                {/* Theme Toggle */}
                <ThemeToggle />
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button className="text-gray-600 dark:text-gray-300 hover:text-deep-blue-700 dark:hover:text-blue-400">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="divider-pattern mb-8"></div>
            <div className="text-center text-gray-600 dark:text-gray-300">
              <p className="mb-2 font-medium">© 2025 SanadCheck. Built for Islamic scholarship research.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This tool provides automated analysis for informational purposes. For scholarly decisions, consult qualified experts.
              </p>
            </div>
          </div>
        </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
