'use client'

import { useState } from 'react'
import { BookOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import glossaryData from 'public/glossary'

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredGlossary = glossaryData.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.arabic && item.arabic.includes(searchTerm))
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: 'all', label: 'All Terms' },
    { id: 'hadith', label: 'Hadith Science' },
    { id: 'rijal', label: 'Narrator Criticism' },
    { id: 'technical', label: 'Technical Terms' },
    { id: 'general', label: 'General' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-scholar-cream via-white to-sage-50 pattern-geometric-subtle py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-deep-blue to-deep-blue-light p-4 rounded-2xl shadow-scholarly">
              <BookOpenIcon className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold font-lora text-deep-blue mb-4 tracking-wide">Glossary</h1>
          <p className="text-xl text-scholar-gray-600 font-inter leading-relaxed">
            Essential terms in hadith science and narrator criticism
          </p>
          
          {/* Decorative divider */}
          <div className="flex justify-center mt-8">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-warm-tan to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-scholar-gray-400" />
            <input
              type="text"
              placeholder="Search terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="scholarly-input pl-10 w-full bg-white border border-sage-200 focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium font-inter transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-deep-blue text-white shadow-scholarly transform scale-105'
                    : 'bg-white text-scholar-gray-700 hover:bg-sage-50 hover:text-deep-blue border border-sage-200 shadow-sm'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6 text-scholar-gray-600 font-inter">
          Showing {filteredGlossary.length} of {glossaryData.length} terms
        </div>

        {/* Glossary Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGlossary.map((item, index) => (
            <div key={index} className="scholarly-card bg-white border border-sage-200 hover:shadow-scholarly hover:scale-105 transition-all duration-300">
              {/* Term Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold font-lora text-deep-blue">{item.term}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    item.category === 'hadith' ? 'bg-deep-blue/10 text-deep-blue border border-deep-blue/20' :
                    item.category === 'rijal' ? 'bg-sage-100 text-sage-800 border border-sage-300' :
                    item.category === 'technical' ? 'bg-warm-tan/20 text-warm-tan-dark border border-warm-tan/30' :
                    'bg-scholar-gray-100 text-scholar-gray-800 border border-scholar-gray-200'
                  }`}>
                    {item.category}
                  </span>
                </div>
                {item.arabic && (
                  <div className="bg-sage-25 p-3 rounded-lg border border-sage-100">
                    <p className="text-lg text-deep-blue font-amiri leading-relaxed" dir="rtl">
                      {item.arabic}
                    </p>
                  </div>
                )}
              </div>

              {/* Definition */}
              <p className="text-scholar-gray-700 leading-relaxed mb-4 font-inter">
                {item.definition}
              </p>

              {/* Related Terms */}
              {item.relatedTerms && item.relatedTerms.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-scholar-gray-700 mb-2 font-inter">Related Terms:</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.relatedTerms.map((related, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-sage-50 text-sage-700 px-3 py-1 rounded-full cursor-pointer hover:bg-sage-100 hover:text-deep-blue transition-colors duration-200 border border-sage-200"
                        onClick={() => setSearchTerm(related)}
                      >
                        {related}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredGlossary.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-sage-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BookOpenIcon className="h-8 w-8 text-sage-600" />
            </div>
            <h3 className="text-lg font-semibold font-lora text-deep-blue mb-2">No terms found</h3>
            <p className="text-scholar-gray-500 mb-4 font-inter">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="scholarly-button scholarly-button-outline"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Additional Resources */}
        <div className="mt-16">
          <div className="scholarly-card bg-gradient-to-br from-sage-50 via-white to-warm-tan-light border border-sage-200 text-center">
            <h2 className="text-2xl font-semibold font-lora text-deep-blue mb-4">
              Want to Learn More?
            </h2>
            <p className="text-scholar-gray-600 mb-6 text-lg font-inter leading-relaxed">
              Explore our methodology page to understand how these terms apply in practice
            </p>
            
            {/* Decorative divider */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-warm-tan to-transparent"></div>
            </div>
            
            <a
              href="/methodology"
              className="scholarly-button inline-block"
            >
              View Methodology
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
