import { Currency, ExchangeRate } from '@/types';

interface CalculateExchangeParams {
  amount: number;
  originCurrency: Currency;
  destinationCurrency: Currency;
  couponCode?: string;
}

class ExchangeService {
  async calculateExchange(params: CalculateExchangeParams): Promise<ExchangeRate> {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.get('/exchange/calculate', { params });
      // return response.data;

      // Mock response
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay

      const { amount, originCurrency, destinationCurrency, couponCode } = params;

      let rate = 3.433;
      if (couponCode === 'MICASA21') {
        rate = 3.422; // Apply discount
      }

      const calculatedAmount =
        originCurrency === 'USD'
          ? amount * rate
          : amount / rate;

      return {
        buyRate: 3.321,
        sellRate: 3.433,
        originCurrency,
        destinationCurrency,
        calculatedAmount,
        estimatedSaving: 555.0,
        koins: 10000,
      };
    } catch (error) {
      console.error('Calculate exchange error:', error);
      throw error;
    }
  }
}

export const exchangeService = new ExchangeService();
