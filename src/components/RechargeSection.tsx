"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RECHARGE_OPTIONS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export default function RechargeSection() {
  const [rechargeLoading, setRechargeLoading] = useState<string | null>(null);

  const handleRecharge = async (optionId: string, amount: number) => {
    setRechargeLoading(optionId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRechargeLoading(null);
    
    // Show success notification (in real app, would show toast/modal)
    alert(`Successfully recharged ${formatCurrency(amount)} to your GCASH wallet!`);
  };

  return (
    <div className="space-y-6">
      {/* GCASH Header */}
      <div className="text-center bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-2xl p-6 border border-blue-500/30">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            G
          </div>
          <h3 className="text-2xl font-bold text-white">GCASH Recharge</h3>
        </div>
        <p className="text-slate-300">
          Instant top-ups with zero processing fees. Funds are added to your GCASH wallet immediately.
        </p>
      </div>

      {/* Recharge Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {RECHARGE_OPTIONS.map((option) => {
          const isLoading = rechargeLoading === option.id;
          
          return (
            <Card 
              key={option.id}
              className="relative overflow-hidden bg-gradient-to-br from-blue-900/40 via-slate-800 to-green-900/40 border-blue-600/50 hover:border-blue-400/70 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
            >
              {/* Popular badge */}
              {option.popular && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 text-xs">
                    POPULAR
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-3 text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mb-3">
                  <span className="text-2xl">📱</span>
                </div>
                <CardTitle className="text-xl text-white">
                  GCASH {formatCurrency(option.amount)}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-center">
                {/* Amount Display */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-1">
                    ₱{option.amount.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-300">Recharge Amount</p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 min-h-[2.5rem] flex items-center justify-center">
                  {option.description}
                </p>

                {/* Processing Time */}
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>{option.processingTime}</span>
                </div>

                {/* Recharge Button */}
                <Button
                  onClick={() => handleRecharge(option.id, option.amount)}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    `RECHARGE NOW`
                  )}
                </Button>

                {/* Features */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-center gap-2 text-xs text-green-300">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    Zero Fees
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-blue-300">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    Instant Credit
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* GCASH Benefits */}
      <div className="bg-gradient-to-r from-blue-900/20 to-green-900/20 rounded-2xl p-6 border border-blue-500/20">
        <h4 className="text-lg font-semibold text-white mb-4 text-center">Why Choose GCASH Recharge?</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="text-2xl">⚡</div>
            <h5 className="text-white font-medium">Lightning Fast</h5>
            <p className="text-sm text-slate-300">Instant crediting to your GCASH wallet</p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">💎</div>
            <h5 className="text-white font-medium">Zero Fees</h5>
            <p className="text-sm text-slate-300">No additional charges or hidden costs</p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">🔒</div>
            <h5 className="text-white font-medium">100% Secure</h5>
            <p className="text-sm text-slate-300">Bank-grade encryption and security</p>
          </div>
        </div>
      </div>
    </div>
  );
}