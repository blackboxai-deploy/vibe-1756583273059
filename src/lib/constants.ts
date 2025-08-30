// Constants and configurations for AHAS Financial Platform

import { ServerPackage, RechargeOption, WithdrawalOption, QuickWithdrawAmount } from './types';

export const SERVER_PACKAGES: ServerPackage[] = [
  {
    id: 'server-1',
    name: 'SERVER 1',
    price: 250,
    currency: 'PHP',
    maxQuantity: 3,
    availableSlots: 3,
    description: 'Entry-level server package perfect for small projects',
    features: ['Basic Performance', '24/7 Support', 'Standard Security']
  },
  {
    id: 'server-2',
    name: 'SERVER 2',
    price: 450,
    currency: 'PHP',
    maxQuantity: 3,
    availableSlots: 3,
    description: 'Enhanced server package for growing businesses',
    features: ['Enhanced Performance', 'Priority Support', 'Advanced Security']
  },
  {
    id: 'server-3',
    name: 'SERVER 3',
    price: 820,
    currency: 'PHP',
    maxQuantity: 3,
    availableSlots: 3,
    description: 'Premium server package for demanding applications',
    features: ['High Performance', 'Premium Support', 'Enterprise Security']
  },
  {
    id: 'server-4',
    name: 'SERVER 4',
    price: 1800,
    currency: 'PHP',
    maxQuantity: 1,
    availableSlots: 1,
    description: 'Ultimate server package for enterprise solutions',
    features: ['Maximum Performance', 'Dedicated Support', 'Military-grade Security']
  }
];

export const RECHARGE_OPTIONS: RechargeOption[] = [
  {
    id: 'gcash-100',
    provider: 'GCASH',
    amount: 100,
    currency: 'PHP',
    description: 'Quick top-up for daily transactions',
    processingTime: 'Instant'
  },
  {
    id: 'gcash-250',
    provider: 'GCASH',
    amount: 250,
    currency: 'PHP',
    description: 'Popular recharge amount for weekly use',
    popular: true,
    processingTime: 'Instant'
  },
  {
    id: 'gcash-500',
    provider: 'GCASH',
    amount: 500,
    currency: 'PHP',
    description: 'Premium recharge for heavy users',
    popular: true,
    processingTime: 'Instant'
  },
  {
    id: 'gcash-1000',
    provider: 'GCASH',
    amount: 1000,
    currency: 'PHP',
    description: 'Maximum recharge for business users',
    processingTime: 'Instant'
  },
  {
    id: 'gcash-2000',
    provider: 'GCASH',
    amount: 2000,
    currency: 'PHP',
    description: 'VIP recharge for enterprise users',
    processingTime: 'Instant'
  }
];

export const WITHDRAWAL_OPTIONS: WithdrawalOption[] = [
  {
    id: 'gcash-withdraw',
    provider: 'GCASH',
    minAmount: 100,
    maxAmount: 50000,
    currency: 'PHP',
    processingTime: 'Instant to 5 minutes',
    fee: 5,
    feeThreshold: 500,
    description: 'Fast and reliable GCASH withdrawals',
    brandColor: 'blue'
  },
  {
    id: 'paymaya-withdraw',
    provider: 'PAYMAYA',
    minAmount: 100,
    maxAmount: 50000,
    currency: 'PHP',
    processingTime: 'Instant to 10 minutes',
    fee: 7,
    feeThreshold: 500,
    description: 'Secure PAYMAYA withdrawals',
    brandColor: 'green'
  }
];

export const QUICK_WITHDRAW_AMOUNTS: QuickWithdrawAmount[] = [
  { amount: 500, label: '₱500', popular: true },
  { amount: 1000, label: '₱1,000', popular: true },
  { amount: 2000, label: '₱2,000' },
  { amount: 5000, label: '₱5,000' }
];

export const MOCK_USER_BALANCE = {
  available: 12500,
  pending: 0,
  currency: 'PHP',
  lastUpdated: new Date()
};

export const BRAND_COLORS = {
  AHAS: {
    primary: '#1a202c',
    secondary: '#2d3748',
    accent: '#3182ce'
  },
  GCASH: {
    primary: '#007fff',
    secondary: '#0066cc',
    accent: '#00cc88'
  },
  PAYMAYA: {
    primary: '#00b050',
    secondary: '#008a3d',
    accent: '#ff6b35'
  }
};

export const SERVICE_TABS = [
  { id: 'servers', label: 'Server Packages', icon: '🖥️' },
  { id: 'recharge', label: 'Recharge', icon: '📱' },
  { id: 'withdraw', label: 'Withdraw', icon: '💰' }
] as const;