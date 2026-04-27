import { useState } from 'react';
import { useTransactionStore } from '@/stores/transactionStore';
import { transactionService } from '@/services/transaction/transactionService';
import { CreateTransactionData } from '@/types';

export const useTransactionFlow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { currentTransaction, setTransaction, setStep, accountTo } = useTransactionStore();

  const handleCreateTransaction = async (data: CreateTransactionData) => {
    if (!accountTo) {
      setError('Destination account not selected');
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);
      const transaction = await transactionService.createTransaction(data, accountTo);
      setTransaction(transaction);
      setStep(2);
      return true;
    } catch (err: any) {
      setError(err?.message || 'Failed to create transaction');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadReceipt = async (file: any) => {
    if (!currentTransaction) {
      setError('No active transaction');
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);
      const transaction = await transactionService.uploadReceipt(file, currentTransaction);
      setTransaction(transaction);
      setStep(3);
      return true;
    } catch (err: any) {
      setError(err?.message || 'Failed to upload receipt');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCreateTransaction, handleUploadReceipt, isLoading, error };
};
