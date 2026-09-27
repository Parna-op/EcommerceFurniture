import React, { useState } from 'react';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle, 
  MapPin, 
  ChevronRight, 
  Clock,
  ArrowLeft,
  File
} from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('ORD-72945'); // Default mock ID
  const [isSearching, setIsSearching] = useState(false);

  // Mock Data for the simulation
  const orderDetails = {
    id: 'ORD-72945',
    date: 'Feb 05, 2026',
    total: '$1,250.00',
    payment: 'Visa ending in 4242',
    address: {
      name: 'Alex Morgan',
      street: '123 Luxury Lane, Penthouse 4B',
      city: 'New York, NY 10012'
    },
    items: [
      {
        id: 1,
        name: 'Signature Lounge Chair',
        variant: 'Leather / Walnut',
        price: '$850.00',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=300&auto=format&fit=crop'
      },
      {
        id: 2,
        name: 'Minimalist Side Table',
        variant: 'Oak',
        price: '$400.00',
        image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=300&auto=format&fit=crop'
      }
    ]
  };

  // Timeline Steps
  const steps = [
    { status: 'Order Placed', date: 'Feb 05, 10:23 AM', icon: File, completed: true },
    { status: 'Processing', date: 'Feb 06, 02:15 PM', icon: Package, completed: true },
    { status: 'Shipped', date: 'Feb 07, 09:45 AM', icon: Truck, completed: true, current: true }, // Current Step
    { status: 'Out for Delivery', date: 'Estimated Feb 09', icon: MapPin, completed: false },
    { status: 'Delivered', date: '-', icon: CheckCircle, completed: false },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => setIsSearching(false), 800);
  };

  return (
    <div className="min-h-screen px-4 pt-24 pb-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Breadcrumb / Back */}
        <div className="mb-8">
           <Link to="/" className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-black">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
           </Link>
        </div>

        {/* 1. Header & Search */}
        <div className="flex flex-col justify-between gap-6 mb-10 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 font-serif text-3xl font-medium text-gray-900 md:text-4xl">
              Track Your Order
            </h1>
            <p className="text-gray-500">
              Enter your order ID to see the current status.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex w-full md:w-auto">
            <input 
              type="text" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-l-full focus:outline-none focus:border-black md:w-64"
              placeholder="e.g. ORD-12345"
            />
            <button 
              disabled={isSearching}
              className="px-6 py-3 font-medium text-white transition-colors bg-black rounded-r-full hover:bg-gray-800 disabled:opacity-70"
            >
              {isSearching ? '...' : 'Track'}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* 2. Left Column: Timeline & Status */}
          <div className="space-y-8 lg:col-span-2">
            
            {/* Main Status Card */}
            <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
               <div className="flex flex-col items-start justify-between pb-8 mb-8 border-b border-gray-100 sm:flex-row sm:items-center">
                  <div>
                    <span className="px-3 py-1 text-sm font-medium text-green-600 rounded-full bg-green-50">
                      In Transit
                    </span>
                    <h2 className="mt-3 font-serif text-2xl text-gray-900">
                      Arriving by Feb 09
                    </h2>
                    <p className="mt-1 text-gray-500">
                      Carrier: FedEx &bull; Tracking: <span className="font-medium text-black">9400100000000000</span>
                    </p>
                  </div>
                  <Truck className="w-12 h-12 mt-4 text-gray-200 sm:mt-0" strokeWidth={1} />
               </div>

               {/* Vertical Timeline */}
               <div className="relative pl-4">
                  {/* Vertical Line */}
                  <div className="absolute top-2 left-[19px] h-[85%] w-0.5 bg-gray-200" />
                  
                  <div className="space-y-10">
                    {steps.map((step, index) => (
                      <div key={index} className="relative flex items-start gap-6 group">
                        
                        {/* Dot / Icon */}
                        <div className={`
                          relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-4 
                          ${step.completed || step.current ? 'bg-black border-white shadow-md' : 'bg-gray-100 border-white'}
                          ${step.current ? 'ring-2 ring-black ring-offset-2' : ''}
                        `}>
                          <step.icon className={`w-4 h-4 ${step.completed || step.current ? 'text-white' : 'text-gray-400'}`} />
                        </div>

                        {/* Text */}
                        <div className="flex flex-col pt-1">
                           <span className={`font-medium text-base ${step.completed || step.current ? 'text-gray-900' : 'text-gray-400'}`}>
                             {step.status}
                           </span>
                           <span className="text-sm text-gray-500 mt-0.5">
                             {step.date}
                           </span>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            {/* Shipping Address Mobile/Tablet placement (optional) */}
          </div>

          {/* 3. Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky p-6 bg-white border border-gray-100 shadow-sm rounded-2xl top-24">
              <h3 className="mb-6 text-lg font-medium text-gray-900">Order Details</h3>
              
              {/* Items */}
              <div className="mb-8 space-y-6">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="object-cover w-16 h-16 bg-gray-100 rounded-lg"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                      <p className="mb-1 text-xs text-gray-500">{item.variant}</p>
                      <p className="text-sm font-medium">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 space-y-4 border-t border-gray-100">
                 
                 {/* Address Info */}
                 <div>
                   <h4 className="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">Shipping To</h4>
                   <p className="text-sm text-gray-800">{orderDetails.address.name}</p>
                   <p className="text-sm leading-relaxed text-gray-600">{orderDetails.address.street}</p>
                   <p className="text-sm text-gray-600">{orderDetails.address.city}</p>
                 </div>

                 {/* Totals */}
                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="font-medium text-gray-900">Total Paid</span>
                    <span className="text-xl font-bold text-gray-900">{orderDetails.total}</span>
                 </div>
              </div>

              <div className="mt-8">
                <button className="w-full py-3 text-sm font-medium text-gray-700 transition-colors border border-gray-200 rounded-full hover:bg-gray-50">
                  Need Help?
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderTracking;