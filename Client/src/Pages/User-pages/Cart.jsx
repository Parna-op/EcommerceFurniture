import React from "react";
import { 
  Minus, Plus, Trash2, ArrowRight, ShoppingBag, 
  ShieldCheck, Truck, ArrowLeft 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useItem } from "../../context/CartContext";

const Cart = () => {
  const { items, setItem } = useItem();
  const navigate = useNavigate();

  const updateQuantity = (id, change) => {
    setItem(prev => prev.map(item => {
      const itemId = item.id || item._id;
      if (itemId === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity  };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setItem(prev => prev.filter(item => (item.id || item._id) !== id));
  };

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; 
  const total = subtotal + tax; 

  const handlecheckout = (e) => {
    e.preventDefault();
    navigate('/checkout', { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans antialiased relative overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed top-[-20%] right-[-10%] w-[70%] h-[70%] bg-amber-100/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-50/40 rounded-full blur-[120px] pointer-events-none z-0" />

      <main className="relative z-10 px-4 pt-8 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* TOP NAV: Back Button */}
        <div className="mb-6 md:mb-10">
            <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all bg-white border rounded-full shadow-sm text-stone-500 border-stone-200 hover:text-stone-900 hover:border-amber-400 group"
            >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Back to Home
            </button>
        </div>

        {/* Page Header */}
        <div className="mb-8 text-center md:mb-12 animate-in fade-in slide-in-from-bottom-4">
           <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-2">Review Order</p>
           <h2 className="text-3xl font-light md:text-4xl text-stone-900">
               Your <span className="font-serif italic text-amber-600/80">Collection</span>
           </h2>
        </div>

        {items.length > 0 ? (
          <div className="grid items-start grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-12">
            
            {/* LEFT COLUMN: Cart Items List */}
            {/* Added max-height and overflow-y-auto to make this section scrollable */}
            <div className="lg:col-span-8">
                <div className="space-y-4 md:space-y-6 max-h-[60vh] lg:max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                    {items.map((item, index) => (
                        item.quantity > 0 && (
                        <div 
                            key={index} 
                            className="flex gap-4 p-4 transition-all duration-500 border md:gap-5 md:p-5 group bg-white/60 backdrop-blur-md border-stone-100 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-stone-200/40 hover:border-amber-100"
                        >
                            {/* --- 1. IMAGE --- */}
                            <div className="w-20 h-20 overflow-hidden shadow-sm md:w-32 md:h-32 shrink-0 rounded-xl md:rounded-2xl bg-stone-100">
                                <img src={item.url} alt={item.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
                            </div>

                            {/* --- 2. DETAILS --- */}
                            <div className="flex flex-col justify-between flex-1 py-1">
                                
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="space-y-1">
                                        <h3 className="font-serif text-base leading-tight tracking-wide md:text-xl text-stone-900 line-clamp-2">{item.name}</h3>
                                        <p className="text-[10px] md:text-xs text-stone-500 font-bold uppercase tracking-wider">{item.category || "Luxury Item"}</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center self-start gap-3 px-2 py-1 border rounded-full shadow-sm sm:self-auto bg-stone-50 border-stone-200">
                                        <button 
                                            onClick={() => updateQuantity((item.id || item._id), -1)}
                                            className="p-1 transition-all rounded-full hover:bg-white hover:shadow-sm text-stone-400 hover:text-stone-900 active:scale-90"
                                        >
                                            <Minus size={16} strokeWidth={2.5} />
                                        </button>
                                        <span className="w-4 text-sm font-bold text-center md:text-lg text-stone-900 tabular-nums">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity((item.id || item._id), 1)}
                                            className="p-1 transition-all rounded-full hover:bg-white hover:shadow-sm text-stone-400 hover:text-stone-900 active:scale-90"
                                        >
                                            <Plus size={16} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-end justify-between mt-2">
                                    <p className="text-sm font-bold md:text-base text-amber-600">{formatINR(item.price)}</p>

                                    <button 
                                        onClick={() => removeItem(item.id || item._id)}
                                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                    >
                                        <Trash2 size={16} />
                                        <span className="hidden sm:inline">Remove</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                        )
                    ))}
                </div>
            </div>

            {/* RIGHT COLUMN: Order Summary (Sticky) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
              <div className="p-6 md:p-8 bg-white/80 backdrop-blur-xl border border-white/60 rounded-[30px] md:rounded-[40px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.05)] ring-1 ring-stone-50">
                <h3 className="mb-6 font-serif text-xl text-stone-900">Order Summary</h3>
                
                <div className="mb-8 space-y-4">
                  <div className="flex justify-between text-sm text-stone-500">
                    <span>Subtotal</span>
                    <span className="font-medium text-stone-900">{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-stone-500">
                    <span>Shipping</span>
                    <span className="font-medium text-emerald-600 uppercase text-[10px] tracking-wider bg-emerald-50 px-2 py-1 rounded-full">Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-stone-500">
                    <span>Tax (18%)</span>
                    <span className="font-medium text-stone-900">{formatINR(tax)}</span>
                  </div>
                  <div className="h-px my-4 bg-gradient-to-r from-transparent via-stone-200 to-transparent" />
                  <div className="flex items-end justify-between">
                    <span className="text-sm font-bold tracking-widest uppercase text-stone-900">Total</span>
                    <span className="font-serif text-2xl text-stone-900">{formatINR(total)}</span>
                  </div>
                </div>

                <button onClick={handlecheckout} className="relative flex items-center justify-center w-full gap-3 px-8 py-4 overflow-hidden transition-all duration-500 rounded-full shadow-xl group bg-stone-900 hover:shadow-amber-500/20 active:scale-95">
                  <span className="relative z-10 text-xs font-bold text-white uppercase tracking-[0.25em] group-hover:text-amber-200 transition-colors">Checkout</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-stone-800 to-stone-900" />
                  <div className="absolute inset-0 transition-transform duration-1000 ease-in-out -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full" />
                  <ArrowRight size={16} className="relative z-10 transition-colors text-stone-400 group-hover:text-white" />
                </button>

                <div className="grid grid-cols-2 gap-4 pt-6 mt-8 border-t border-stone-100">
                   <div className="flex flex-col items-center gap-2 text-center">
                      <ShieldCheck size={18} className="text-stone-400" />
                      <p className="text-[9px] text-stone-400 uppercase tracking-widest font-bold">Secure Payment</p>
                   </div>
                   <div className="flex flex-col items-center gap-2 text-center">
                      <Truck size={18} className="text-stone-400" />
                      <p className="text-[9px] text-stone-400 uppercase tracking-widest font-bold">Express Delivery</p>
                   </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 text-center duration-500 animate-in zoom-in-95">
             <div className="flex items-center justify-center w-24 h-24 mb-6 border rounded-full shadow-inner bg-stone-50 border-stone-100">
                <ShoppingBag size={32} className="text-stone-300" />
             </div>
             <h3 className="mb-2 font-serif text-2xl text-stone-900">Your Collection is Empty</h3>
             <p className="mb-8 text-sm text-stone-500">Looks like you haven't added any luxury pieces yet.</p>
             <button onClick={() => navigate('/')} className="px-8 py-3 text-xs font-bold tracking-widest uppercase transition-all bg-white border rounded-full shadow-sm border-stone-200 hover:border-amber-300 hover:text-amber-700 active:scale-95 hover:shadow-md">
                Start Browsing
             </button>
          </div>
        )}

      </main>
      
      {/* Scrollbar CSS Injection */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e7e5e4;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #d6d3d1;
        }
      `}</style>
    </div>
  );
};

export default Cart;