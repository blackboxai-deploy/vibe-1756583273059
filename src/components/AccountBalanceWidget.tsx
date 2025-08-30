"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_USER_BALANCE } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export default function AccountBalanceWidget() {
  const [balance, setBalance] = useState(MOCK_USER_BALANCE);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshBalance = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setBalance({
      ...balance,
      lastUpdated: new Date()
    });
    setIsRefreshing(false);
  };

  const formatLastUpdated = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <Card className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800 border-slate-700 shadow-2xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            💼 Account Balance
          </h3>
          <Button
            onClick={refreshBalance}
            disabled={isRefreshing}
            variant="ghost"
            size="sm"
            className="text-slate-300 hover:text-white hover:bg-white/10"
          >
            {isRefreshing ? (
              <div className="w-4 h-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              '🔄'
            )}
          </Button>
        </div>

        <div className="space-y-4">
          {/* Available Balance */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300 mb-1">Available Balance</p>
                <p className="text-3xl font-bold text-green-400">
                  {formatCurrency(balance.available, balance.currency)}
                </p>
              </div>
              <div className="text-3xl">💚</div>
            </div>
          </div>

          {/* Pending Balance */}
          {balance.pending > 0 && (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300 mb-1">Pending</p>
                  <p className="text-xl font-semibold text-yellow-400">
                    {formatCurrency(balance.pending, balance.currency)}
                  </p>
                </div>
                <div className="text-2xl">⏳</div>
              </div>
            </div>
          )}

          {/* Total Balance */}
          <div className="bg-gradient-to-r from-blue-600/20 to-green-600/20 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300 mb-1">Total Balance</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(balance.available + balance.pending, balance.currency)}
                </p>
              </div>
              <div className="text-2xl">💎</div>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-slate-400 text-center">
            Last updated: {formatLastUpdated(balance.lastUpdated)}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/5 border-white/20 text-slate-300 hover:bg-white/10 hover:text-white"
          >
            📊 History
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/5 border-white/20 text-slate-300 hover:bg-white/10 hover:text-white"
          >
            📈 Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}