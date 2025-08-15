import { InformationCircleIcon, HeartIcon, AcademicCapIcon, BookOpenIcon, ShieldCheckIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-deep-blue-800 to-deep-blue-900 p-4 rounded-xl shadow-lg">
              <InformationCircleIcon className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-4 font-serif">About SanadCheck</h1>
          <p className="text-xl text-scholar-gray-600 leading-relaxed">
            Building trust through transparent hadith analysis
          </p>
          <div className="divider-pattern w-24 mx-auto mt-6"></div>
        </div>

        <div className="space-y-12">
          {/* Mission */}
          <section className="card border-l-4 border-warm-tan-400">
            <div className="flex items-center mb-6">
              <div className="bg-warm-tan-100 p-2 rounded-lg mr-4">
                <HeartIcon className="h-6 w-6 text-warm-tan-600" />
              </div>
              <h2 className="text-2xl font-semibold text-scholar-gray-800 font-serif">Our Mission</h2>
            </div>
            <p className="text-scholar-gray-600 text-lg leading-relaxed mb-4">
              SanadCheck was created to democratize access to hadith authentication by making traditional 
              Islamic scholarship methodologies accessible through modern technology. We believe that every 
              student of Islamic knowledge should have the tools to verify the authenticity of hadith chains.
            </p>
            <p className="text-scholar-gray-600 text-lg leading-relaxed">
              Our goal is to bridge the gap between classical scholarship and contemporary research needs, 
              providing both Sunni and Shia perspectives on narrator criticism while maintaining the highest 
              standards of academic integrity.
            </p>
          </section>

          {/* Why We Built This */}
          <section className="card">
            <div className="flex items-center mb-6">
              <div className="bg-deep-blue-100 p-2 rounded-lg mr-4">
                <AcademicCapIcon className="h-6 w-6 text-deep-blue-700" />
              </div>
              <h2 className="text-2xl font-semibold text-scholar-gray-800 font-serif">Why We Built This</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-scholar-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-scholar-gray-800 mb-3">Accessibility</h3>
                <p className="text-scholar-gray-600">
                  Traditional rijāl books are often in classical Arabic and require years of study to navigate 
                  effectively. We make this knowledge accessible to researchers worldwide.
                </p>
              </div>
              <div className="bg-scholar-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-scholar-gray-800 mb-3">Speed</h3>
                <p className="text-scholar-gray-600">
                  What once took hours of manual research through multiple volumes can now be accomplished 
                  in seconds, allowing scholars to focus on higher-level analysis.
                </p>
              </div>
              <div className="bg-scholar-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-scholar-gray-800 mb-3">Transparency</h3>
                <p className="text-scholar-gray-600">
                  Every analysis includes direct references to source materials, allowing users to verify 
                  and explore the scholarly basis for each evaluation.
                </p>
              </div>
              <div className="bg-scholar-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-scholar-gray-800 mb-3">Inclusivity</h3>
                <p className="text-scholar-gray-600">
                  By including both Sunni and Shia methodologies, we foster interfaith dialogue and 
                  comprehensive understanding of Islamic scholarship traditions.
                </p>
              </div>
            </div>
          </section>

          {/* Our Approach */}
          <section className="card border-l-4 border-muted-green-400">
            <h2 className="text-2xl font-semibold text-scholar-gray-800 mb-6 font-serif">Our Approach</h2>
            <div className="space-y-6">
              <div className="bg-deep-blue-50 border-l-4 border-deep-blue-400 pl-6 py-4 rounded-r-lg">
                <div className="flex items-center mb-2">
                  <BookOpenIcon className="h-5 w-5 text-deep-blue-600 mr-2" />
                  <h3 className="font-semibold text-scholar-gray-800">Scholarly Foundation</h3>
                </div>
                <p className="text-scholar-gray-600">
                  Our analysis is grounded in classical Islamic scholarship, drawing from authoritative 
                  works of rijāl criticism from both Sunni and Shia traditions.
                </p>
              </div>
              <div className="bg-muted-green-50 border-l-4 border-muted-green-400 pl-6 py-4 rounded-r-lg">
                <div className="flex items-center mb-2">
                  <ShieldCheckIcon className="h-5 w-5 text-muted-green-600 mr-2" />
                  <h3 className="font-semibold text-scholar-gray-800">Technology Enhancement</h3>
                </div>
                <p className="text-scholar-gray-600">
                  We use modern AI and natural language processing to automate the analysis while 
                  maintaining adherence to traditional methodological principles.
                </p>
              </div>
              <div className="bg-warm-tan-50 border-l-4 border-warm-tan-400 pl-6 py-4 rounded-r-lg">
                <div className="flex items-center mb-2">
                  <ChartBarIcon className="h-5 w-5 text-warm-tan-600 mr-2" />
                  <h3 className="font-semibold text-scholar-gray-800">Continuous Improvement</h3>
                </div>
                <p className="text-scholar-gray-600">
                  Our system continuously learns and improves, incorporating feedback from scholars 
                  and updating with new research findings.
                </p>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="card bg-warm-tan-50 border-warm-tan-200">
            <h2 className="text-2xl font-semibold text-scholar-gray-800 mb-6 font-serif">Our Commitment</h2>
            <p className="text-scholar-gray-700 text-lg leading-relaxed mb-4">
              We are committed to maintaining the integrity of Islamic scholarship while making it more 
              accessible. Our team includes both technology experts and Islamic scholars who work together 
              to ensure accuracy and authenticity in our analysis.
            </p>
            <p className="text-scholar-gray-700 text-lg leading-relaxed">
              We welcome feedback, corrections, and suggestions from the scholarly community to help us 
              improve and refine our methodology.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-deep-blue-800 to-deep-blue-900 rounded-xl p-8 text-center text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4 font-serif">Ready to Get Started?</h2>
            <p className="text-deep-blue-100 mb-6 text-lg">
              Explore our methodology or try analyzing a hadith chain
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/methodology" className="bg-white text-deep-blue-800 hover:bg-warm-tan-50 font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                View Methodology
              </Link>
              <Link href="/" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200">
                Try Analysis Tool
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
