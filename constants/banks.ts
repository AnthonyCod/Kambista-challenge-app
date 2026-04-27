import { BankName } from '@/types';

export const BANKS: BankName[] = [
  'BCP',
  'Interbank',
  'BBVA',
  'Banbif',
  'Scotiabank',
  'Banco Falabella',
  'Banco Pichincha',
  'Banco de Comercio',
  'Citibank Perú',
  'Mi Banco',
  'Banco GNB',
];

export const FUND_ORIGINS = [
  'Ahorros',
  'Herencia',
  'Venta de inmuebles',
  'Otros',
] as const;

export const DOCUMENT_TYPES = ['DNI', 'CCE', 'Pasaporte'] as const;

export const ACCOUNT_TYPES = ['Corriente', 'Ahorros'] as const;

export const CURRENCIES = [
  { label: 'Dólares', value: 'USD' as const },
  { label: 'Soles', value: 'PEN' as const },
];
