import { Transaction, CreateTransactionData, BankAccount } from '@/types';

export const transactionService = {
  async createTransaction(
    data: CreateTransactionData,
    account: BankAccount
  ): Promise<Transaction> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `TXN-${Date.now()}`,
          amount: data.amount,
          fromCurrency: data.fromCurrency,
          toCurrency: data.toCurrency,
          rate: 3.433,
          calculatedAmount: data.amount * 3.433,
          originBank: data.originBank,
          destinationAccount: account,
          fundOrigin: data.fundOrigin,
          status: 'pending_transfer',
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(),
        });
      }, 500);
    });
  },

  async uploadReceipt(
    _file: any,
    currentTransaction: Transaction
  ): Promise<Transaction> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...currentTransaction,
          status: 'pending_verification',
          receiptUrl: 'mock_receipt_url',
          operationCode: `km${Math.random().toString(36).substring(2, 8)}`,
        });
      }, 500);
    });
  },
};
