import React, { useEffect, useState } from 'react';
import { Check, ArrowRight, Home, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Simple fade-in effect on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50">
      
      {/* Main Card */}
      <div 
        className={`
          max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden 
          transform transition-all duration-700 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}
      >
        
        {/* Top Section: Green Background & Icon */}
        <div className="flex flex-col items-center p-8 border-b border-green-100 bg-green-50">
          
          {/* Animated Checkmark Circle */}
          <div className="relative">
            <div className="flex items-center justify-center w-20 h-20 mb-4 bg-green-100 rounded-full animate-pulse">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-lg shadow-green-200">
                 <Check className="w-8 h-8 text-white stroke-3" />
              </div>
            </div>
            
            {/* Optional decorative dots/confetti via CSS */}
            <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none animate-spin-slow">
              <div className="absolute top-0 w-1 h-1 transform -translate-x-1/2 -translate-y-2 bg-green-400 rounded-full left-1/2"></div>
              <div className="absolute bottom-0 w-1 h-1 transform -translate-x-1/2 translate-y-2 bg-green-400 rounded-full left-1/2"></div>
              <div className="absolute left-0 w-1 h-1 transform -translate-x-2 -translate-y-1/2 bg-green-400 rounded-full top-1/2"></div>
              <div className="absolute right-0 w-1 h-1 transform translate-x-2 -translate-y-1/2 bg-green-400 rounded-full top-1/2"></div>
            </div>
          </div>

          <h2 className="mb-2 text-3xl font-bold text-gray-800 font-heading">
            Payment Successful!
          </h2>
          <p className="text-center text-gray-500">
            Thank you for your purchase. Your order is being processed.
          </p>
        </div>

        {/* Middle Section: Order Details */}
        <div className="p-8 space-y-6">
          
          {/* Order Info Grid */}
          <div className="p-4 space-y-3 bg-gray-50 rounded-2xl">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Order Number</span>
              <span className="font-semibold text-gray-900">#ORD-72945</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="font-semibold text-gray-900">Feb 07, 2026</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Total Amount</span>
              <span className="font-semibold text-green-600">$1,250.00</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-semibold text-gray-900">Credit Card **** 4242</span>
            </div>
          </div>

          <p className="text-xs text-center text-gray-400">
            A confirmation email has been sent to <b>user@example.com</b>
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <Link 
              to="/products" 
              className="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-full font-medium hover:bg-gray-800 transition-all hover:shadow-lg active:scale-95"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link 
              to="/" 
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-3.5 rounded-full font-medium hover:bg-gray-50 transition-all active:scale-95"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentSuccess;