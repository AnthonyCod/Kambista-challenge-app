// User & Auth Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  documentType: DocumentType;
  documentNumber: string;
  phoneNumber: string;
  dateOfBirth: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setSession: (user: User, token: string) => void;
  clearSession: () => void;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  documentType: DocumentType;
  documentNumber: string;
  phoneNumber: string;
  dateOfBirth: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

export type DocumentType = 'DNI' | 'CCE' | 'Pasaporte';

// Exchange & Calculator Types
export type Currency = 'PEN' | 'USD';

export interface ExchangeRate {
  buyRate: number;
  sellRate: number;
  originCurrency: Currency;
  destinationCurrency: Currency;
  calculatedAmount: number;
  estimatedSaving: number;
  koins: number;
}

export interface CalculatorState {
  amount: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  rates: ExchangeRate | null;
  couponCode: string;
  isLoading: boolean;
  setAmount: (amount: number) => void;
  setFromCurrency: (currency: Currency) => void;
  setToCurrency: (currency: Currency) => void;
  setCouponCode: (code: string) => void;
  swap: () => void;
  fetchRates: () => Promise<void>;
}

// Transaction Types
export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountType: 'Corriente' | 'Ahorros';
  currency: Currency;
  alias: string;
  isOwn: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  rate: number;
  calculatedAmount: number;
  originBank: string;
  destinationAccount: BankAccount;
  fundOrigin: FundOrigin;
  status: TransactionStatus;
  createdAt: string;
  expiresAt: string;
  receiptUrl?: string;
  operationCode?: string;
}

export type TransactionStatus =
  | 'pending_data'
  | 'pending_transfer'
  | 'pending_verification'
  | 'processing'
  | 'completed'
  | 'cancelled';

export type FundOrigin =
  | 'Ahorros'
  | 'Herencia'
  | 'Venta de inmuebles'
  | 'Otros';

export interface TransactionState {
  currentTransaction: Transaction | null;
  step: number;
  bankFrom: string | null;
  accountTo: BankAccount | null;
  fundOrigin: FundOrigin | null;
  accounts: BankAccount[];
  setBankFrom: (bank: string) => void;
  setAccountTo: (account: BankAccount) => void;
  setFundOrigin: (origin: FundOrigin) => void;
  setStep: (step: number) => void;
  setTransaction: (transaction: Transaction) => void;
  addAccount: (account: Omit<BankAccount, 'id'>) => void;
  uploadReceipt: (file: any) => Promise<boolean>;
  reset: () => void;
}

export interface CreateTransactionData {
  amount: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  originBank: string;
  destinationAccountId: string;
  fundOrigin: FundOrigin;
  couponCode?: string;
}

// Bank Types
export type BankName =
  | 'BCP'
  | 'Interbank'
  | 'BBVA'
  | 'Banbif'
  | 'Scotiabank'
  | 'Banco Falabella'
  | 'Banco Pichincha'
  | 'Banco de Comercio'
  | 'Citibank Perú'
  | 'Mi Banco'
  | 'Banco GNB';

export interface BankTransferDetails {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  ruc: string;
  accountType: string;
  amount: number;
  currency: Currency;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, string[]>;
}
