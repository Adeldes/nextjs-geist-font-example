'use client';

import { useAuth } from '@/hooks/useAuth';
import ContractList from '@/components/contracts/contract-list';

export default function ContractsPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ContractList />
    </div>
  );
}
