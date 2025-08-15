import Link from 'next/link'
import { ExclamationTriangleIcon, HomeIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="max-w-md mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-100 p-4 rounded-2xl">
            <ExclamationTriangleIcon className="h-12 w-12 text-yellow-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you're looking for doesn't exist. It might have been moved, deleted, 
          or you entered the wrong URL.
        </p>
        
        <div className="space-y-4">
          <Link href="/" className="btn-primary inline-flex items-center">
            <HomeIcon className="h-5 w-5 mr-2" />
            Return Home
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Popular pages:</p>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              <Link href="/analysis" className="text-blue-600 hover:text-blue-700">Analysis</Link>
              <span className="text-gray-300">•</span>
              <Link href="/methodology" className="text-blue-600 hover:text-blue-700">Methodology</Link>
              <span className="text-gray-300">•</span>
              <Link href="/glossary" className="text-blue-600 hover:text-blue-700">Glossary</Link>
              <span className="text-gray-300">•</span>
              <Link href="/faq" className="text-blue-600 hover:text-blue-700">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
