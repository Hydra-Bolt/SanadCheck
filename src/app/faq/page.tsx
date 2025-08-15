'use client'

import { useState } from 'react'
import { QuestionMarkCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface FAQItem {
  question: string
  answer: string
  category: 'general' | 'technical' | 'scholarly'
}

const faqData: FAQItem[] = [
  {
    question: "What is SanadCheck and how does it work?",
    answer: "SanadCheck is an AI-powered tool that analyzes hadith chains (sanad) by identifying narrators and evaluating their reliability according to traditional Islamic scholarship methodologies. It processes your input text, identifies narrator names, and provides authenticity assessments based on classical rijāl works from both Sunni and Shia traditions.",
    category: "general"
  },
  {
    question: "Can I trust the results for religious decisions?",
    answer: "No. SanadCheck is a research and educational tool designed to assist scholars and students. For authoritative religious rulings and scholarly decisions, you should always consult qualified Islamic scholars and traditional sources. Our tool provides automated analysis for informational purposes only.",
    category: "scholarly"
  },
  {
    question: "Which scholarly sources does SanadCheck use?",
    answer: "We utilize authoritative rijāl works including Tahdhīb al-Tahdhīb, Taqrīb al-Tahdhīb, Al-Jarh wa al-Ta'dīl, Mīzān al-I'tidāl from Sunni tradition, and Rijāl al-Najāshī, Al-Fihrist, Rijāl al-Tūsī from Shia tradition, among others. All sources are referenced transparently in our analysis.",
    category: "scholarly"
  },
  {
    question: "Does SanadCheck support both Arabic and English text?",
    answer: "Yes! SanadCheck can process hadith text in Arabic script, English translation, and transliterated Arabic. Our AI system is trained to recognize narrator names across different languages and writing systems.",
    category: "technical"
  },
  {
    question: "What's the difference between Sunni and Shia analysis?",
    answer: "The two traditions use different rijāl (narrator criticism) methodologies and source materials. Sunni analysis relies on works like Ibn Hajar's compilations, while Shia analysis uses works by scholars like al-Najāshī and al-Tūsī. The grading systems and criteria for narrator reliability also differ between the traditions.",
    category: "scholarly"
  },
  {
    question: "How accurate is the narrator identification?",
    answer: "Our AI system has high accuracy in identifying common narrator names, but accuracy may vary with rare names, unusual transliterations, or incomplete chains. We're continuously improving our database and recognition algorithms. When uncertain, the system will indicate confidence levels.",
    category: "technical"
  },
  {
    question: "Can I analyze partial hadith chains?",
    answer: "Yes, SanadCheck can analyze partial chains or individual narrators. However, complete chains provide more comprehensive authenticity assessments. The tool will analyze whatever narrator information is provided and indicate if the chain appears incomplete.",
    category: "general"
  },
  {
    question: "Is SanadCheck free to use?",
    answer: "Yes, SanadCheck is currently free to use. We believe in making Islamic scholarship tools accessible to researchers, students, and scholars worldwide. We may introduce premium features in the future while maintaining core functionality free.",
    category: "general"
  },
  {
    question: "How should I format my hadith text for best results?",
    answer: "For optimal results, include the complete chain of narrators (sanad) along with the hadith text. You can paste Arabic text directly, use transliterations, or provide English translations. Clear separation between narrator names (using terms like 'from', 'عن', 'حدثنا') helps improve accuracy.",
    category: "technical"
  },
  {
    question: "What if a narrator is not found in your database?",
    answer: "If a narrator is not found, SanadCheck will indicate this in the results. Our database covers most well-known narrators from classical works, but some rare or regional narrators might not be included. We're continuously expanding our database based on additional sources.",
    category: "technical"
  },
  {
    question: "Can I contribute corrections or suggestions?",
    answer: "Absolutely! We welcome feedback from scholars and researchers. If you notice errors, have suggestions for improvement, or can provide additional scholarly sources, please contact us. Community feedback is essential for maintaining accuracy and reliability.",
    category: "general"
  },
  {
    question: "How do you handle disputed narrator evaluations?",
    answer: "When scholars disagree about a narrator's reliability, SanadCheck presents multiple viewpoints rather than imposing a single judgment. We indicate the range of scholarly opinions and note any significant disagreements, allowing users to consider different perspectives.",
    category: "scholarly"
  }
]

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const filteredFAQ = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory)

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General' },
    { id: 'technical', label: 'Technical' },
    { id: 'scholarly', label: 'Scholarly' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-scholar-cream via-white to-sage-50 pattern-islamic-subtle py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-deep-blue to-deep-blue-light p-4 rounded-2xl shadow-scholarly">
              <QuestionMarkCircleIcon className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold font-lora text-deep-blue mb-4 tracking-wide">Frequently Asked Questions</h1>
          <p className="text-xl text-scholar-gray-600 font-inter leading-relaxed">
            Find answers to common questions about SanadCheck
          </p>
          
          {/* Decorative divider */}
          <div className="flex justify-center mt-8">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-warm-tan to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
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

        {/* FAQ Items */}
        <div className="space-y-6">
          {filteredFAQ.map((faq, index) => {
            const isExpanded = expandedItems.includes(index)
            return (
              <div key={index} className="scholarly-card bg-white border border-sage-200">
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full flex items-center justify-between text-left p-2 hover:bg-sage-50 rounded-lg transition-colors duration-200"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold font-lora text-deep-blue mb-2 leading-tight">
                      {faq.question}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        faq.category === 'general' ? 'bg-deep-blue/10 text-deep-blue border border-deep-blue/20' :
                        faq.category === 'technical' ? 'bg-sage-100 text-sage-800 border border-sage-300' :
                        'bg-warm-tan/20 text-warm-tan-dark border border-warm-tan/30'
                      }`}>
                        {faq.category}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    {isExpanded ? (
                      <ChevronUpIcon className="h-5 w-5 text-scholar-gray-500 transition-transform duration-200" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-scholar-gray-500 transition-transform duration-200" />
                    )}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-sage-200 animate-fade-in-up">
                    <div className="bg-sage-25 p-4 rounded-lg">
                      <p className="text-scholar-gray-700 leading-relaxed font-inter">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <div className="scholarly-card bg-gradient-to-br from-sage-50 via-white to-warm-tan-light border border-sage-200">
            <h2 className="text-2xl font-semibold font-lora text-deep-blue mb-4">
              Still Have Questions?
            </h2>
            <p className="text-scholar-gray-600 mb-6 text-lg font-inter leading-relaxed">
              Can't find the answer you're looking for? We're here to help!
            </p>
            
            {/* Decorative divider */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-warm-tan to-transparent"></div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="scholarly-button">
                Contact Support
              </button>
              <button className="scholarly-button scholarly-button-outline">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
