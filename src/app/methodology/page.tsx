import { Cog6ToothIcon, BookOpenIcon, ShieldCheckIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-scholar-cream via-white to-sage-50 pattern-islamic-subtle py-16">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-deep-blue to-deep-blue-light p-5 rounded-2xl shadow-scholarly">
              <Cog6ToothIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold font-lora text-deep-blue mb-6 tracking-wide">Our Methodology</h1>
          <p className="text-xl text-scholar-gray-600 font-inter leading-relaxed max-w-3xl mx-auto">
            Transparent analysis process for scholarly scrutiny
          </p>
          
          {/* Decorative divider */}
          <div className="flex justify-center mt-10">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-warm-tan to-transparent rounded-full"></div>
          </div>
        </div>

        <div className="space-y-16">
          {/* Overview */}
          <section className="scholarly-card bg-white border border-sage-200 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold font-lora text-deep-blue mb-8">Analysis Framework</h2>
            <p className="text-scholar-gray-700 text-lg leading-relaxed mb-10 font-inter max-w-4xl">
              Our hadith chain analysis methodology combines traditional Islamic scholarship principles 
              with modern computational techniques. We strictly adhere to established rijāl (narrator criticism) 
              methodologies from both Sunni and Shia traditions.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-deep-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-deep-blue/20">
                  <BookOpenIcon className="h-10 w-10 text-deep-blue" />
                </div>
                <h3 className="font-semibold font-lora text-deep-blue mb-3 text-lg">Classical Sources</h3>
                <p className="text-scholar-gray-600 font-inter leading-relaxed">
                  Based on authoritative rijāl works and biographical dictionaries
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-sage-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-sage-300">
                  <ShieldCheckIcon className="h-10 w-10 text-sage-700" />
                </div>
                <h3 className="font-semibold font-lora text-deep-blue mb-3 text-lg">Verified Data</h3>
                <p className="text-scholar-gray-600 font-inter leading-relaxed">
                  Cross-referenced narrator information from multiple scholarly sources
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-warm-tan/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-warm-tan/30">
                  <ChartBarIcon className="h-10 w-10 text-warm-tan-dark" />
                </div>
                <h3 className="font-semibold font-lora text-deep-blue mb-3 text-lg">Graded Output</h3>
                <p className="text-scholar-gray-600 font-inter leading-relaxed">
                  Clear authenticity ratings based on traditional grading systems
                </p>
              </div>
            </div>
          </section>

          {/* Sunni Methodology */}
          <section className="scholarly-card bg-white border border-sage-200 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold font-lora text-deep-blue mb-8">Sunni Analysis Approach</h2>
            
            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold font-lora text-deep-blue mb-6">Source Materials</h3>
                <div className="bg-sage-25 p-6 rounded-xl border border-sage-200">
                  <ul className="space-y-3 text-scholar-gray-700 font-inter">
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-3">•</span>
                      <span><strong>Tahdhīb al-Tahdhīb</strong> by Ibn Hajar al-Asqalānī</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-3">•</span>
                      <span><strong>Taqrīb al-Tahdhīb</strong> by Ibn Hajar al-Asqalānī</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-3">•</span>
                      <span><strong>Al-Jarh wa al-Ta'dīl</strong> by Ibn Abī Hātim</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-3">•</span>
                      <span><strong>Mīzān al-I'tidāl</strong> by al-Dhahabī</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-3">•</span>
                      <span><strong>Lisān al-Mīzān</strong> by Ibn Hajar</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold font-lora text-deep-blue mb-6">Grading System</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-sage-50 p-6 rounded-xl border border-sage-200">
                    <h4 className="font-medium font-lora text-sage-800 mb-3 text-lg">Reliable (Thiqah)</h4>
                    <p className="text-sage-700 font-inter leading-relaxed">Narrators with established trustworthiness and precision</p>
                  </div>
                  <div className="bg-warm-tan-light p-6 rounded-xl border border-warm-tan/30">
                    <h4 className="font-medium font-lora text-warm-tan-dark mb-3 text-lg">Acceptable (Hasan)</h4>
                    <p className="text-warm-tan-dark font-inter leading-relaxed">Good narrators with minor criticism</p>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                    <h4 className="font-medium font-lora text-orange-800 mb-3 text-lg">Weak (Da'īf)</h4>
                    <p className="text-orange-700 font-inter leading-relaxed">Narrators with significant reliability issues</p>
                  </div>
                  <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                    <h4 className="font-medium font-lora text-red-800 mb-3 text-lg">Rejected (Matrūk)</h4>
                    <p className="text-red-700 font-inter leading-relaxed">Narrators deemed unreliable by scholars</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Shia Methodology */}
          <section className="scholarly-card bg-white border border-sage-200 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold font-lora text-deep-blue mb-8">Shia Analysis Approach</h2>
            
            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold font-lora text-deep-blue mb-6">Source Materials</h3>
                <div className="bg-sage-25 p-6 rounded-xl border border-sage-200">
                  <ul className="space-y-3 text-scholar-gray-700 font-inter">
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-3">•</span>
                      <span><strong>Rijāl al-Najāshī</strong> by Ahmad al-Najāshī</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-3">•</span>
                      <span><strong>Al-Fihrist</strong> by al-Tūsī</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-3">•</span>
                      <span><strong>Rijāl al-Tūsī</strong> by al-Tūsī</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-3">•</span>
                      <span><strong>Rijāl Ibn al-Ghadā'irī</strong></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-3">•</span>
                      <span><strong>Tanqīh al-Maqāl</strong> by al-Māmaqānī</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold font-lora text-deep-blue mb-6">Grading Categories</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-sage-50 p-6 rounded-xl border border-sage-200">
                    <h4 className="font-medium font-lora text-sage-800 mb-3 text-lg">Reliable (Thiqah)</h4>
                    <p className="text-sage-700 font-inter leading-relaxed">Trustworthy narrators according to Shia criteria</p>
                  </div>
                  <div className="bg-deep-blue/10 p-6 rounded-xl border border-deep-blue/20">
                    <h4 className="font-medium font-lora text-deep-blue mb-3 text-lg">Good (Hasan)</h4>
                    <p className="text-deep-blue font-inter leading-relaxed">Praiseworthy narrators with good reputation</p>
                  </div>
                  <div className="bg-warm-tan-light p-6 rounded-xl border border-warm-tan/30">
                    <h4 className="font-medium font-lora text-warm-tan-dark mb-3 text-lg">Acceptable (Muwathaqqaq)</h4>
                    <p className="text-warm-tan-dark font-inter leading-relaxed">Indirectly authenticated narrators</p>
                  </div>
                  <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                    <h4 className="font-medium font-lora text-red-800 mb-3 text-lg">Weak (Da'īf)</h4>
                    <p className="text-red-700 font-inter leading-relaxed">Criticized or unreliable narrators</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Analysis Process */}
          <section className="scholarly-card bg-white border border-sage-200 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold font-lora text-deep-blue mb-8">Step-by-Step Process</h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-6 p-4">
                <div className="bg-deep-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-lg flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold font-lora text-deep-blue mb-3 text-xl">Text Parsing</h3>
                  <p className="text-scholar-gray-700 font-inter leading-relaxed text-lg">
                    AI identifies and extracts narrator names from the hadith chain, handling both Arabic script and transliterations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6 p-4">
                <div className="bg-deep-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-lg flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold font-lora text-deep-blue mb-3 text-xl">Narrator Identification</h3>
                  <p className="text-scholar-gray-700 font-inter leading-relaxed text-lg">
                    Each narrator is matched against our comprehensive database of rijāl biographical information.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6 p-4">
                <div className="bg-deep-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-lg flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold font-lora text-deep-blue mb-3 text-xl">Scholarly Assessment</h3>
                  <p className="text-scholar-gray-700 font-inter leading-relaxed text-lg">
                    Critical evaluations from classical scholars are compiled and analyzed for each narrator.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6 p-4">
                <div className="bg-deep-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-lg flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold font-lora text-deep-blue mb-3 text-xl">Grade Assignment</h3>
                  <p className="text-scholar-gray-700 font-inter leading-relaxed text-lg">
                    Based on scholarly consensus, each narrator receives appropriate reliability grades.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6 p-4">
                <div className="bg-deep-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-lg flex-shrink-0">5</div>
                <div>
                  <h3 className="font-semibold font-lora text-deep-blue mb-3 text-xl">Chain Analysis</h3>
                  <p className="text-scholar-gray-700 font-inter leading-relaxed text-lg">
                    Overall chain strength is determined based on the weakest link principle and traditional rules.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Limitations */}
          <section className="scholarly-card bg-warm-tan-light border border-warm-tan/30 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold font-lora text-warm-tan-dark mb-8">Important Limitations</h2>
            <div className="space-y-6 text-warm-tan-dark font-inter leading-relaxed text-lg">
              <div className="bg-white/50 p-6 rounded-lg border border-warm-tan/20">
                <p>
                  <strong className="text-xl">Automated Analysis:</strong> While our system is based on traditional scholarship, 
                  it cannot replace the nuanced judgment of qualified scholars.
                </p>
              </div>
              <div className="bg-white/50 p-6 rounded-lg border border-warm-tan/20">
                <p>
                  <strong className="text-xl">Database Coverage:</strong> Our narrator database, while comprehensive, may not 
                  include every narrator mentioned in classical literature.
                </p>
              </div>
              <div className="bg-white/50 p-6 rounded-lg border border-warm-tan/20">
                <p>
                  <strong className="text-xl">Scholarly Differences:</strong> Where scholars disagree on narrator reliability, 
                  we present multiple viewpoints rather than definitive judgments.
                </p>
              </div>
              <div className="bg-white/50 p-6 rounded-lg border border-warm-tan/20">
                <p>
                  <strong className="text-xl">Context Sensitivity:</strong> Traditional hadith criticism considers factors beyond 
                  narrator reliability that our automated system may not fully capture.
                </p>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
            <section className="bg-gradient-to-br from-deep-blue to-deep-blue-dark rounded-2xl p-10 text-white text-center shadow-xl">
            <h2 className="text-3xl font-bold font-lora mb-6 text-white">Scholarly Consultation Recommended</h2>
            <div className="flex justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
            <p className="text-blue-100 text-xl font-inter leading-relaxed max-w-3xl mx-auto">
              This tool is designed to assist and expedite research, not replace traditional scholarship. 
              For authoritative rulings and religious guidance, always consult qualified Islamic scholars.
            </p>
            </section>
        </div>
      </div>
    </div>
  )
}
