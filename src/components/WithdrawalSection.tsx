"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { WITHDRAWAL_OPTIONS, QUICK_WITHDRAW_AMOUNTS, MOCK_USER_BALANCE } from '@/lib/constants';
import { formatCurrency, calculateWithdrawalFee, calculateNetWithdrawal, validateWithdrawalAmount } from '@/lib/utils';
import type { PaymentMethod } from '@/lib/types';

export default function WithdrawalSection() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('GCASH');
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState<string>('');

  const selectedOption = WITHDRAWAL_OPTIONS.find(opt => opt.provider === selectedMethod);
  const numericAmount = parseFloat(withdrawalAmount) || 0;
  const fee = selectedOption ? calculateWithdrawalFee(numericAmount, selectedOption.fee, selectedOption.feeThreshold) : { amount: 0, currency: 'PHP', description: '' };
  const netAmount = calculateNetWithdrawal(numericAmount, fee);

  const handleAmountChange = (value: string) => {
    setWithdrawalAmount(value);
    setValidationError('');
    
    if (value && selectedOption) {
      const amount = parseFloat(value);
      const validation = validateWithdrawalAmount(
        amount, 
        selectedOption.minAmount, 
        selectedOption.maxAmount, 
        MOCK_USER_BALANCE.available
      );
      
      if (!validation.isValid && validation.error) {
        setValidationError(validation.error);
      }
    }
  };

  const handleQuickAmount = (amount: number) => {
    setWithdrawalAmount(amount.toString());
    setValidationError('');
  };

  const handleWithdrawal = async () => {
    if (!selectedOption || validationError || numericAmount === 0) return;

    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    
    // Show success notification (in real app, would show toast/modal)
    alert(`Successfully initiated withdrawal of ${formatCurrency(netAmount)} to your ${selectedMethod} account!`);
    setWithdrawalAmount('');
  };

  if (!selectedOption) return null;

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WITHDRAWAL_OPTIONS.map((option) => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-all duration-300 ${
              selectedMethod === option.provider
                ? 'bg-gradient-to-br from-green-900/40 via-slate-800 to-orange-900/40 border-green-500/50 shadow-lg shadow-green-500/20'
                : 'bg-slate-800/50 border-slate-600 hover:border-slate-500'
            }`}
            onClick={() => setSelectedMethod(option.provider)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg ${
                    option.provider === 'GCASH' 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500' 
                      : 'bg-gradient-to-r from-green-500 to-orange-500'
                  }`}>
                    {option.provider === 'GCASH' ? 'G' : 'P'}
                  </div>
                  <div>
                    <h3 className="text-xl text-white">{option.provider}</h3>
                    <p className="text-sm text-slate-300">{option.description}</p>
                  </div>
                </div>
                {selectedMethod === option.provider && (
                  <div className="text-2xl">✅</div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Processing Time</p>
                  <p className="text-white font-medium">{option.processingTime}</p>
                </div>
                <div>
                  <p className="text-slate-400">Fee Structure</p>
                  <p className="text-white font-medium">
                    {option.fee === 0 ? 'Free' : `₱${option.fee} (below ₱${option.feeThreshold})`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Withdrawal Form */}
      <Card className="bg-gradient-to-br from-slate-800 via-green-900/20 to-slate-800 border-slate-600">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            💰 Withdraw to {selectedMethod}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Amount Buttons */}
          <div>
            <Label className="text-slate-300 mb-3 block">Quick Select Amount</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {QUICK_WITHDRAW_AMOUNTS.map((quickAmount) => (
                <Button
                  key={quickAmount.amount}
                  variant="outline"
                  onClick={() => handleQuickAmount(quickAmount.amount)}
                  className="bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white relative"
                >
                  {quickAmount.label}
                  {quickAmount.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 py-0">
                      ⭐
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount Input */}
          <div>
            <Label className="text-slate-300 mb-2 block">Custom Amount</Label>
            <Input
              type="number"
              placeholder="Enter withdrawal amount"
              value={withdrawalAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
              min={selectedOption.minAmount}
              max={selectedOption.maxAmount}
            />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>Min: ₱{selectedOption.minAmount.toLocaleString()}</span>
              <span>Max: ₱{selectedOption.maxAmount.toLocaleString()}</span>
            </div>
            {validationError && (
              <p className="text-red-400 text-sm mt-1">{validationError}</p>
            )}
          </div>

          {/* Withdrawal Summary */}
          {numericAmount > 0 && !validationError && (
            <div className="bg-slate-700/30 rounded-xl p-4 space-y-3">
              <h4 className="text-white font-medium">Withdrawal Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-300">Withdrawal Amount:</span>
                  <span className="text-white font-medium">{formatCurrency(numericAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Processing Fee:</span>
                  <span className={fee.amount > 0 ? 'text-orange-400' : 'text-green-400'}>
                    {fee.amount > 0 ? `- ${formatCurrency(fee.amount)}` : 'FREE'}
                  </span>
                </div>
                <div className="border-t border-slate-600 pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-white">Net Amount:</span>
                    <span className="text-green-400 text-lg">{formatCurrency(netAmount)}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 text-center mt-2">{fee.description}</p>
              </div>
            </div>
          )}

          {/* Withdraw Button */}
          <Button
            onClick={handleWithdrawal}
            disabled={!numericAmount || !!validationError || isProcessing}
            className="w-full bg-gradient-to-r from-green-600 to-orange-600 hover:from-green-700 hover:to-orange-700 text-white font-semibold py-3"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing Withdrawal...
              </div>
            ) : (
              `WITHDRAW ${numericAmount > 0 ? formatCurrency(netAmount) : ''} TO ${selectedMethod}`
            )}
          </Button>

          {/* Processing Info */}
          <div className="text-center text-xs text-slate-400">
            <p>Processing time: {selectedOption.processingTime}</p>
            <p className="mt-1">Your funds will be credited to your {selectedMethod} account</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}