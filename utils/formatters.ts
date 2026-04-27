import { Currency } from '@/types';

export const formatCurrency = (value: number, currency?: Currency): string => {
  return new Intl.NumberFormat('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const parseCurrencyString = (text: string): number => {
  const numValue = parseFloat(text.replace(/,/g, ''));
  return isNaN(numValue) ? 0 : numValue;
};
