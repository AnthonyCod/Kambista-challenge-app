import { create } from 'zustand';
import { TransactionState, Transaction, BankAccount, FundOrigin } from '@/types';

export const useTransactionStore = create<TransactionState>((set, get) => ({
  currentTransaction: null,
  step: 1,
  bankFrom: null,
  accountTo: null,
  fundOrigin: null,
  accounts: [],

  setBankFrom: (bank: string) => set({ bankFrom: bank }),
  setAccountTo: (account: BankAccount) => set({ accountTo: account }),
  setFundOrigin: (origin: FundOrigin) => set({ fundOrigin: origin }),
  setStep: (step: number) => set({ step }),

  setTransaction: (transaction: Transaction) => set({ currentTransaction: transaction }),

  addAccount: (account: Omit<BankAccount, 'id'>) => {
    const newAccount: BankAccount = { ...account, id: `ACC-${Date.now()}` };
    set((state) => ({ accounts: [...state.accounts, newAccount] }));
  },

  uploadReceipt: async (file: any) => {
    // TODO: Implement actual file upload to backend API
    // For now, just simulate a successful upload
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Receipt uploaded successfully:', file);
        resolve(true);
      }, 1500);
    });
  },

  reset: () => {
    set({
      currentTransaction: null,
      step: 1,
      bankFrom: null,
      accountTo: null,
      fundOrigin: null,
    });
  },
}));
