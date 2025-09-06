'use client';

import { useAuth } from '@/contexts/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { AuthModal } from '@/components/auth/AuthModal';
import { useState, useEffect } from 'react';
import { UserExtraction, UserAnalysis } from '@/types/auth';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [extractions, setExtractions] = useState<UserExtraction[]>([]);
  const [analyses, setAnalyses] = useState<UserAnalysis[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  const fetchUserData = async () => {
    setLoadingData(true);
    try {
      // Fetch user extractions
      const extractionsRes = await fetch('/api/sanad/user/extractions');
      if (extractionsRes.ok) {
        const extractionsData = await extractionsRes.json();
        setExtractions(extractionsData.extractions || []);
      }

      // Fetch user analyses
      const analysesRes = await fetch('/api/sanad/user/analyses');
      if (analysesRes.ok) {
        const analysesData = await analysesRes.json();
        setAnalyses(analysesData.analyses || []);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <Card className="text-center p-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Access Your Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Sign in to access your analysis history, manage sessions, and track your research.
              </p>
              <Button onClick={() => setShowAuthModal(true)}>
                Sign In
              </Button>
            </Card>
          </div>
        </div>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultMode="login"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.full_name || user?.username}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your Hadith analysis history and account settings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Narrator Verification History */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Narrator Verification History
              </h3>
              
              {loadingData ? (
                <Card className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-500 dark:text-gray-400">Loading extractions...</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {/* Extractions Summary */}
                  <Card className="p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Total Extractions
                    </h4>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {extractions.length}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Hadith texts processed for narrator extraction
                    </p>
                  </Card>

                  {/* Recent Extractions */}
                  {extractions.length > 0 ? (
                    <Card className="p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        Recent Extractions
                      </h4>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {extractions.slice(0, 5).map((extraction) => (
                          <div key={extraction.id} className="border-l-4 border-blue-200 dark:border-blue-700 pl-3 py-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              {extraction.hadith_text.substring(0, 120)}...
                            </p>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                {new Date(extraction.created_at).toLocaleDateString()}
                              </p>
                              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                                Extraction
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ) : (
                    <Card className="p-6 text-center">
                      <div className="text-gray-400 dark:text-gray-500 mb-2">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400">No extractions yet</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                        Start by analyzing some hadith texts
                      </p>
                    </Card>
                  )}
                </div>
              )}
            </div>

            {/* Chain Analysis History */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Chain Analysis History
              </h3>
              
              {loadingData ? (
                <Card className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  <p className="mt-4 text-gray-500 dark:text-gray-400">Loading analyses...</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {/* Analyses Summary */}
                  <Card className="p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Total Analyses
                    </h4>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {analyses.length}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Comprehensive chain analyses completed
                    </p>
                  </Card>

                  {/* Recent Analyses */}
                  {analyses.length > 0 ? (
                    <Card className="p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        Recent Analyses
                      </h4>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {analyses.slice(0, 5).map((analysis) => (
                          <div key={analysis.id} className="border-l-4 border-green-200 dark:border-green-700 pl-3 py-2">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Analysis #{analysis.id}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              Chain reliability assessment completed
                            </p>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                {new Date(analysis.created_at).toLocaleDateString()}
                              </p>
                              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                                Analysis
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ) : (
                    <Card className="p-6 text-center">
                      <div className="text-gray-400 dark:text-gray-500 mb-2">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400">No analyses yet</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                        Start by analyzing some hadith chains
                      </p>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Account Information */}
          <div className="mt-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {user?.full_name || 'Not provided'}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {user?.username}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {user?.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Account Role
                  </label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 capitalize">
                    {user?.role}
                  </span>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Account Status
                  </label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.is_active 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {user?.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    User ID
                  </label>
                  <p className="text-gray-900 dark:text-white font-mono text-sm">
                    {user?.id}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
