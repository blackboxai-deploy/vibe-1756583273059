// TypeScript interfaces for AHAS Financial Platform

export interface ServerPackage {
  id: string;
  name: string;
  price: number;
  currency: string;
  maxQuantity: number;
  availableSlots: number;
  description: string;
  features: string[];
}

export interface RechargeOption {
  id: string;
  provider: 'GCASH';
  amount: number;
  currency: string;
  description: string;
  popular?: boolean;
  processingTime: string;
}

export interface WithdrawalOption {
  id: string;
  provider: 'GCASH' | 'PAYMAYA';
  minAmount: number;
  maxAmount: number;
  currency: string;
  processingTime: string;
  fee: number;
  feeThreshold: number;
  description: string;
  brandColor: string;
}

export interface UserBalance {
  available: number;
  pending: number;
  currency: string;
  lastUpdated: Date;
}

export interface Transaction {
  id: string;
  type: 'purchase' | 'recharge' | 'withdrawal';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  provider?: string;
  description: string;
}

export interface QuickWithdrawAmount {
  amount: number;
  label: string;
  popular?: boolean;
}

export type ServiceTab = 'servers' | 'recharge' | 'withdraw';

export type PaymentMethod = 'GCASH' | 'PAYMAYA';

export interface TransactionFee {
  amount: number;
  currency: string;
  description: string;
}