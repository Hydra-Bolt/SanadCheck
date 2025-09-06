'use client';

import { useAuth } from '@/contexts/AuthContext';
import { User2, LogOut } from 'lucide-react';
import Button from '@/components/ui/Button';

interface UserMenuProps {
  className?: string;
}

export function UserMenu({ className = '' }: UserMenuProps) {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="flex items-center space-x-2 text-sm">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full">
          <User2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="hidden sm:block">
          <p className="text-gray-900 dark:text-white font-medium">
            {user.full_name || user.username}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            {user.email}
          </p>
        </div>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        icon={LogOut}
        onClick={handleLogout}
        className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
      >
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </div>
  );
}
