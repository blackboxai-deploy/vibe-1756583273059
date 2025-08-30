"use client";

export default function InvestmentHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-green-600/10"></div>
      
      <div className="relative max-w-7xl mx-auto text-center">
        {/* AHAS Brand Logo */}
        <div className="mb-8">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-green-400 tracking-wider">
            AHAS
          </h1>
          <div className="mt-2 w-32 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"></div>
        </div>

        {/* Main heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Advanced Financial
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
            Investment Platform
          </span>
        </h2>

        {/* Description */}
        <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
          Your complete financial ecosystem featuring server investments, instant recharge services, 
          and secure multi-wallet withdrawals all in one platform.
        </p>

        {/* Service highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-4xl mb-3">🖥️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Server Investment</h3>
            <p className="text-slate-300 text-sm">Premium server packages from ₱250 to ₱1.8K</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-xl font-semibold text-white mb-2">Instant Recharge</h3>
            <p className="text-slate-300 text-sm">GCASH top-ups from ₱100 to ₱2,000</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-xl font-semibold text-white mb-2">Secure Withdrawal</h3>
            <p className="text-slate-300 text-sm">GCASH & PAYMAYA support up to ₱50K</p>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
          <div className="flex items-center gap-2 text-slate-300">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Secure Platform</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">24/7 Support</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Instant Processing</span>
          </div>
        </div>
      </div>
    </div>
  );
}