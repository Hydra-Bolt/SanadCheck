'use client';

import { useAuth } from '@/contexts/AuthContext';
import { SessionsList } from '@/components/auth/SessionsList';
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
            {/* Session Management */}
            <div>
              <SessionsList />
            </div>

            {/* Analysis History */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h3>
              
              {loadingData ? (
                <Card className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-500 dark:text-gray-400">Loading activity...</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {/* Extractions Summary */}
                  <Card className="p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Narrator Extractions
                    </h4>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {extractions.length}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total hadith texts processed
                    </p>
                  </Card>

                  {/* Analyses Summary */}
                  <Card className="p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Chain Analyses
                    </h4>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {analyses.length}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Comprehensive analyses completed
                    </p>
                  </Card>

                  {/* Recent Extractions */}
                  {extractions.length > 0 && (
                    <Card className="p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        Recent Extractions
                      </h4>
                      <div className="space-y-2">
                        {extractions.slice(0, 3).map((extraction) => (
                          <div key={extraction.id} className="border-l-4 border-blue-200 pl-3">
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              {extraction.hadith_text.substring(0, 100)}...
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              {new Date(extraction.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Account Info */}
          <div className="mt-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <p className="text-gray-900 dark:text-white">{user?.full_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <p className="text-gray-900 dark:text-white">{user?.username}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <p className="text-gray-900 dark:text-white">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Role
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">{user?.role}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
