"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import { 
  SERVER_PACKAGES, 
  RECHARGE_OPTIONS, 
  WITHDRAWAL_OPTIONS, 
  QUICK_WITHDRAW_AMOUNTS,
  MOCK_USER_BALANCE 
} from '@/lib/constants';
import { ServerPackage, RechargeOption, PaymentMethod } from '@/lib/types';

export default function AHASFinancialPlatform() {
  const [activeTab, setActiveTab] = useState('servers');

  const [selectedWithdrawal, setSelectedWithdrawal] = useState<PaymentMethod>('GCASH');
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [userBalance] = useState(MOCK_USER_BALANCE);

  const handleServerPurchase = (serverPackage: ServerPackage) => {
    // Simulate purchase logic
    console.log(`Purchasing ${serverPackage.name} for ₱${serverPackage.price}`);
  };

  const handleRecharge = (rechargeOption: RechargeOption) => {
    // Simulate recharge logic
    console.log(`Recharging GCASH with ₱${rechargeOption.amount}`);
  };

  const handleWithdraw = (amount: number, method: PaymentMethod) => {
    // Simulate withdrawal logic
    console.log(`Withdrawing ₱${amount} to ${method}`);
  };

  const calculateWithdrawFee = (amount: number, method: PaymentMethod) => {
    const withdrawalOption = WITHDRAWAL_OPTIONS.find(opt => opt.provider === method);
    if (!withdrawalOption) return 0;
    return amount < withdrawalOption.feeThreshold ? withdrawalOption.fee : 0;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
            <span className="text-3xl font-bold text-white">A</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AHAS
          </h1>
          <p className="text-xl text-slate-300 mb-2">Advanced Financial Investment Platform</p>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Complete financial ecosystem featuring server investments, GCASH recharge services, and multi-wallet withdrawal options. 
            Manage your investments and transactions seamlessly.
          </p>
          
          {/* Balance Widget */}
          <div className="mt-8 inline-block">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-slate-400 mb-1">Available Balance</p>
                  <p className="text-3xl font-bold text-green-400">₱{userBalance.available.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 mt-1">Last updated: {userBalance.lastUpdated.toLocaleTimeString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Services */}
      <div className="container mx-auto px-4 pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-800/50 border-slate-700/50">
            <TabsTrigger value="servers" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              🖥️ Server Packages
            </TabsTrigger>
            <TabsTrigger value="recharge" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              📱 GCASH Recharge
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              💰 Withdraw Funds
            </TabsTrigger>
          </TabsList>

          {/* Server Packages Tab */}
          <TabsContent value="servers">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVER_PACKAGES.map((serverPackage) => (
                <Card key={serverPackage.id} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-400">{serverPackage.name}</CardTitle>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        {serverPackage.availableSlots} Available
                      </Badge>
                    </div>
                    <CardDescription className="text-slate-300">
                      {serverPackage.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">₱{serverPackage.price}</div>
                      <div className="text-sm text-slate-400">Maximum {serverPackage.maxQuantity} PCS</div>
                    </div>
                    
                    <div className="space-y-2">
                      {serverPackage.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-slate-300">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={() => handleServerPurchase(serverPackage)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                      disabled={serverPackage.availableSlots === 0}
                    >
                      {serverPackage.availableSlots > 0 ? 'BUY NOW' : 'SOLD OUT'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* GCASH Recharge Tab */}
          <TabsContent value="recharge">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-blue-400 mb-2">GCASH Recharge Services</h2>
                <p className="text-slate-400">Top up your GCASH wallet instantly with various denominations</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {RECHARGE_OPTIONS.map((recharge) => (
                  <Card key={recharge.id} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 relative">
                    {recharge.popular && (
                      <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                        Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">G</span>
                      </div>
                      <CardTitle className="text-blue-400 text-xl">₱{recharge.amount}</CardTitle>
                      <CardDescription className="text-xs text-slate-400">
                        {recharge.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-center mb-3">
                        <div className="text-xs text-green-400">{recharge.processingTime}</div>
                      </div>
                      <Button 
                        onClick={() => handleRecharge(recharge)}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                      >
                        RECHARGE
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Withdraw Funds Tab */}
          <TabsContent value="withdraw">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-green-400 mb-2">Withdraw Funds</h2>
                <p className="text-slate-400">Choose your preferred withdrawal method and amount</p>
              </div>

              {/* Quick Withdraw Amounts */}
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Quick Withdraw</CardTitle>
                  <CardDescription>Select a preset amount for faster processing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {QUICK_WITHDRAW_AMOUNTS.map((amount) => (
                      <Button
                        key={amount.amount}
                        variant="outline"
                        onClick={() => setWithdrawAmount(amount.amount)}
                        className={`h-16 text-lg font-semibold border-slate-600 hover:border-green-400 hover:text-green-400 ${
                          withdrawAmount === amount.amount ? 'border-green-400 text-green-400 bg-green-400/10' : 'text-white'
                        } ${amount.popular ? 'border-orange-400 text-orange-400' : ''}`}
                      >
                        {amount.label}
                        {amount.popular && (
                          <Badge className="ml-1 bg-orange-500 text-white text-xs">Popular</Badge>
                        )}
                      </Button>
                    ))}
                  </div>
                  
                  {/* Custom Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="custom-amount" className="text-white">Or enter custom amount</Label>
                    <Input
                      id="custom-amount"
                      type="number"
                      placeholder="Enter amount (₱100 - ₱50,000)"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setWithdrawAmount(parseInt(e.target.value) || 0);
                      }}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      min="100"
                      max="50000"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {WITHDRAWAL_OPTIONS.map((method) => (
                  <Card 
                    key={method.id} 
                    className={`bg-slate-800/50 border-slate-700/50 backdrop-blur-sm cursor-pointer transition-all duration-300 ${
                      selectedWithdrawal === method.provider 
                        ? 'border-green-400 bg-green-400/5' 
                        : 'hover:border-green-400/50'
                    }`}
                    onClick={() => setSelectedWithdrawal(method.provider)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${
                            method.provider === 'GCASH' ? 'bg-blue-500' : 'bg-green-500'
                          }`}>
                            {method.provider === 'GCASH' ? 'G' : 'P'}
                          </div>
                          <div>
                            <CardTitle className="text-white">{method.provider}</CardTitle>
                            <CardDescription className="text-slate-400 text-sm">
                              {method.description}
                            </CardDescription>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedWithdrawal === method.provider 
                            ? 'bg-green-400 border-green-400' 
                            : 'border-slate-400'
                        }`}></div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-slate-300">
                          <span>Processing Time:</span>
                          <span className="text-green-400">{method.processingTime}</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Transaction Fee:</span>
                          <span className="text-yellow-400">
                            {withdrawAmount < method.feeThreshold ? `₱${method.fee}` : 'FREE'}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Limits:</span>
                          <span>₱{method.minAmount} - ₱{method.maxAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Withdrawal Summary and Action */}
              {withdrawAmount > 0 && (
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Withdrawal Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-300">Withdrawal Amount:</span>
                      <span className="text-white font-semibold">₱{withdrawAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-300">Transaction Fee:</span>
                      <span className="text-yellow-400 font-semibold">
                        ₱{calculateWithdrawFee(withdrawAmount, selectedWithdrawal)}
                      </span>
                    </div>
                    <Separator className="bg-slate-700" />
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-300">Total Deduction:</span>
                      <span className="text-green-400 font-bold text-lg">
                        ₱{(withdrawAmount + calculateWithdrawFee(withdrawAmount, selectedWithdrawal)).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-300">Withdrawal Method:</span>
                      <span className="text-white font-semibold">{selectedWithdrawal}</span>
                    </div>
                    
                    <Button 
                      onClick={() => handleWithdraw(withdrawAmount, selectedWithdrawal)}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
                      disabled={withdrawAmount < 100 || withdrawAmount > 50000}
                    >
                      WITHDRAW ₱{withdrawAmount.toLocaleString()} TO {selectedWithdrawal}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}