"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SERVER_PACKAGES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export default function ServerPackagesSection() {
  const [selectedQuantities, setSelectedQuantities] = useState<{[key: string]: number}>({});
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);

  const handleQuantityChange = (packageId: string, quantity: number) => {
    setSelectedQuantities(prev => ({
      ...prev,
      [packageId]: quantity
    }));
  };

  const handlePurchase = async (packageId: string) => {
    setPurchaseLoading(packageId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPurchaseLoading(null);
    
    // Show success notification (in real app, would show toast/modal)
    alert(`Successfully purchased ${selectedQuantities[packageId] || 1}x server package!`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {SERVER_PACKAGES.map((pkg) => {
        const selectedQty = selectedQuantities[pkg.id] || 1;
        const isUnavailable = pkg.availableSlots === 0;
        const isLoading = purchaseLoading === pkg.id;
        
        return (
          <Card 
            key={pkg.id}
            className={`relative overflow-hidden transition-all duration-300 ${
              isUnavailable 
                ? 'bg-slate-800/30 border-slate-700/50 opacity-60' 
                : 'bg-gradient-to-br from-slate-800 via-blue-900/30 to-slate-800 border-slate-600 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10'
            }`}
          >
            {/* Popular badge for SERVER 2 */}
            {pkg.id === 'server-2' && (
              <div className="absolute top-3 right-3 z-10">
                <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 text-xs">
                  POPULAR
                </Badge>
              </div>
            )}

            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-white flex items-center justify-between">
                {pkg.name}
                <span className="text-2xl">🖥️</span>
              </CardTitle>
              <p className="text-sm text-slate-300">{pkg.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Pricing */}
              <div className="text-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-1">
                  {formatCurrency(pkg.price, pkg.currency)}
                </div>
                <p className="text-sm text-slate-400">per server instance</p>
              </div>

              {/* Availability */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Available:</span>
                <Badge 
                  variant={isUnavailable ? "destructive" : "secondary"}
                  className={isUnavailable ? "bg-red-900/50 text-red-300" : "bg-green-900/50 text-green-300"}
                >
                  {isUnavailable ? 'Out of Stock' : `${pkg.availableSlots} slots`}
                </Badge>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <p className="text-xs text-slate-400 font-medium">FEATURES:</p>
                <ul className="space-y-1">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Selector */}
              {!isUnavailable && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(pkg.id, Math.max(1, selectedQty - 1))}
                      disabled={selectedQty <= 1 || isLoading}
                      className="w-8 h-8 p-0 bg-slate-700 border-slate-600 hover:bg-slate-600"
                    >
                      -
                    </Button>
                    <span className="text-white font-medium w-8 text-center">{selectedQty}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(pkg.id, Math.min(pkg.maxQuantity, selectedQty + 1))}
                      disabled={selectedQty >= pkg.maxQuantity || isLoading}
                      className="w-8 h-8 p-0 bg-slate-700 border-slate-600 hover:bg-slate-600"
                    >
                      +
                    </Button>
                  </div>
                </div>
              )}

              {/* Purchase Button */}
              <Button
                onClick={() => handlePurchase(pkg.id)}
                disabled={isUnavailable || isLoading}
                className={`w-full ${
                  isUnavailable
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : isUnavailable ? (
                  'Out of Stock'
                ) : (
                  `BUY (${formatCurrency(pkg.price * selectedQty, pkg.currency)})`
                )}
              </Button>

              {/* Max quantity note */}
              {!isUnavailable && (
                <p className="text-xs text-slate-400 text-center">
                  Maximum {pkg.maxQuantity} {pkg.maxQuantity === 1 ? 'server' : 'servers'} per purchase
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}