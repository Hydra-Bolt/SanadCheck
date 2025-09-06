'use client';

import { useAuth } from '@/contexts/AuthContext';
import { UserSession } from '@/types/auth';
import Card from '@/components/ui/Card';
import { Monitor, Smartphone, Globe, Clock } from 'lucide-react';

interface SessionsListProps {
  className?: string;
}

export function SessionsList({ className = '' }: SessionsListProps) {
  const { sessions, refreshSessions, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getDeviceIcon = (userAgent: string) => {
    if (userAgent.toLowerCase().includes('mobile')) {
      return <Smartphone className="w-4 h-4" />;
    }
    return <Monitor className="w-4 h-4" />;
  };

  const getLocationDisplay = (ipAddress: string) => {
    // In a real app, you might want to resolve IP to location
    return ipAddress;
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Active Sessions
        </h3>
        <button
          onClick={refreshSessions}
          className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-3">
        {sessions.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No active sessions found
            </p>
          </Card>
        ) : (
          sessions.map((session: UserSession) => (
            <Card
              key={session.id}
              className={`p-4 ${
                session.is_current
                  ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                  : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="text-gray-600 dark:text-gray-400 mt-1">
                    {getDeviceIcon(session.user_agent)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {session.user_agent.includes('Chrome') ? 'Chrome' : 
                         session.user_agent.includes('Firefox') ? 'Firefox' : 
                         session.user_agent.includes('Safari') ? 'Safari' : 
                         'Browser'}
                      </p>
                      {session.is_current && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Globe className="w-3 h-3" />
                        <span>{getLocationDisplay(session.ip_address)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Last used: {formatDate(session.last_used_at)}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Created: {formatDate(session.created_at)}
                    </p>
                  </div>
                </div>
                
                {!session.is_current && (
                  <button
                    onClick={() => {
                      // In a real app, you'd implement session termination
                      console.log('Terminate session:', session.id);
                    }}
                    className="text-red-600 hover:text-red-500 text-sm"
                  >
                    Terminate
                  </button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
