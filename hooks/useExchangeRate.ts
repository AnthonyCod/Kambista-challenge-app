import { useQuery } from '@tanstack/react-query';
import { exchangeService } from '@/services/api/exchange';
import { Currency } from '@/types';

interface UseExchangeRateParams {
  amount: number;
  originCurrency: Currency;
  destinationCurrency: Currency;
  couponCode?: string;
  enabled?: boolean;
}

export const useExchangeRate = ({
  amount,
  originCurrency,
  destinationCurrency,
  couponCode,
  enabled = true,
}: UseExchangeRateParams) => {
  return useQuery({
    queryKey: ['exchangeRate', amount, originCurrency, destinationCurrency, couponCode],
    queryFn: () =>
      exchangeService.calculateExchange({
        amount,
        originCurrency,
        destinationCurrency,
        couponCode,
      }),
    enabled: enabled && amount > 0,
  });
};
