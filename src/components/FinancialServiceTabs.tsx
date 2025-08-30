"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SERVICE_TABS } from '@/lib/constants';
import AccountBalanceWidget from './AccountBalanceWidget';
import ServerPackagesSection from './ServerPackagesSection';
import RechargeSection from './RechargeSection';
import WithdrawalSection from './WithdrawalSection';

export default function FinancialServiceTabs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Account Balance Widget - Always visible */}
      <div className="mb-8">
        <AccountBalanceWidget />
      </div>

      {/* Service Tabs */}
      <Tabs defaultValue="servers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 backdrop-blur-sm border-slate-700">
          {SERVICE_TABS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-2 text-slate-300 data-[state=active]:text-white data-[state=active]:bg-slate-700"
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Server Packages Tab */}
        <TabsContent value="servers" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                🖥️ Server Investment Packages
              </CardTitle>
              <p className="text-slate-300">
                Premium server packages designed for different business needs. 
                Invest in high-performance infrastructure with 24/7 support.
              </p>
            </CardHeader>
            <CardContent>
              <ServerPackagesSection />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recharge Tab */}
        <TabsContent value="recharge" className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-900/30 to-green-900/30 backdrop-blur-sm border-blue-700/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                📱 GCASH Recharge Services
              </CardTitle>
              <p className="text-slate-300">
                Instant GCASH top-ups with zero processing fees. 
                Keep your wallet loaded for daily transactions and payments.
              </p>
            </CardHeader>
            <CardContent>
              <RechargeSection />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Withdrawal Tab */}
        <TabsContent value="withdraw" className="space-y-6">
          <Card className="bg-gradient-to-br from-green-900/30 to-orange-900/30 backdrop-blur-sm border-green-700/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                💰 Withdrawal Services
              </CardTitle>
              <p className="text-slate-300">
                Fast and secure withdrawals to your preferred e-wallet. 
                Support for GCASH and PAYMAYA with competitive processing times.
              </p>
            </CardHeader>
            <CardContent>
              <WithdrawalSection />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Information */}
      <div className="mt-12 text-center">
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-3">Why Choose AHAS?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300">
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">🔒</div>
              <h4 className="font-medium text-white mb-1">Bank-Grade Security</h4>
              <p className="text-center">Advanced encryption and secure transactions</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-medium text-white mb-1">Lightning Fast</h4>
              <p className="text-center">Instant processing for most transactions</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">🌟</div>
              <h4 className="font-medium text-white mb-1">24/7 Support</h4>
              <p className="text-center">Round-the-clock customer assistance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}