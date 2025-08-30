import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { TransactionFee } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Financial utility functions for AHAS Platform

export function formatCurrency(amount: number, currency: string = 'PHP'): string {
  if (amount >= 1000) {
    return `₱${(amount / 1000).toFixed(1)}K ${currency}`;
  }
  return `₱${amount.toLocaleString()} ${currency}`;
}

export function calculateWithdrawalFee(amount: number, fee: number, threshold: number): TransactionFee {
  const feeAmount = amount < threshold ? fee : 0;
  return {
    amount: feeAmount,
    currency: 'PHP',
    description: feeAmount > 0 ? `Service fee for amounts below ₱${threshold}` : 'No fee'
  };
}

export function calculateNetWithdrawal(amount: number, fee: TransactionFee): number {
  return Math.max(0, amount - fee.amount);
}

export function validateWithdrawalAmount(amount: number, minAmount: number, maxAmount: number, availableBalance: number): {
  isValid: boolean;
  error?: string;
} {
  if (amount < minAmount) {
    return { isValid: false, error: `Minimum withdrawal amount is ₱${minAmount}` };
  }
  if (amount > maxAmount) {
    return { isValid: false, error: `Maximum withdrawal amount is ₱${maxAmount.toLocaleString()}` };
  }
  if (amount > availableBalance) {
    return { isValid: false, error: 'Insufficient balance' };
  }
  return { isValid: true };
}

export function formatProcessingTime(time: string): string {
  return time.charAt(0).toUpperCase() + time.slice(1);
}

export function generateTransactionId(): string {
  return `TXN${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
}

export function isPopularAmount(amount: number, popularAmounts: number[] = [250, 500, 1000]): boolean {
  return popularAmounts.includes(amount);
}
