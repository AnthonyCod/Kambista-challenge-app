import { create } from 'zustand';
import { CalculatorState, Currency } from '@/types';
import { exchangeService } from '@/services/api/exchange';

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  amount: 10000,
  fromCurrency: 'USD',
  toCurrency: 'PEN',
  rates: null,
  couponCode: '',
  isLoading: false,

  setAmount: (amount: number) => {
    set({ amount });
    get().fetchRates();
  },

  setFromCurrency: (currency: Currency) => {
    set({ fromCurrency: currency });
    get().fetchRates();
  },

  setToCurrency: (currency: Currency) => {
    set({ toCurrency: currency });
    get().fetchRates();
  },

  setCouponCode: (code: string) => {
    set({ couponCode: code });
    if (code) {
      get().fetchRates();
    }
  },

  swap: () => {
    const { fromCurrency, toCurrency } = get();
    set({
      fromCurrency: toCurrency,
      toCurrency: fromCurrency,
    });
    get().fetchRates();
  },

  fetchRates: async () => {
    const { amount, fromCurrency, toCurrency, couponCode } = get();

    if (!amount || amount <= 0) return;

    set({ isLoading: true });

    try {
      const rates = await exchangeService.calculateExchange({
        amount,
        originCurrency: fromCurrency,
        destinationCurrency: toCurrency,
        couponCode: couponCode || undefined,
      });

      set({ rates, isLoading: false });
    } catch (error) {
      console.error('Fetch rates error:', error);
      set({ isLoading: false });
    }
  },
}));
