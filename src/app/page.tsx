'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/login';
import Dashboard from '@/components/dashboard/main-dashboard';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600 font-medium">جاري تحميل النظام...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <Dashboard />;
}
