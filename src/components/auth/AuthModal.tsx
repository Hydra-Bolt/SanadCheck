'use client';

import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {mode === 'login' ? (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToRegister={() => setMode('register')}
          />
        ) : (
          <RegisterForm
            onSuccess={handleSuccess}
            onSwitchToLogin={() => setMode('login')}
          />
        )}
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        >
          ×
        </button>
      </div>
    </div>
  );
}
