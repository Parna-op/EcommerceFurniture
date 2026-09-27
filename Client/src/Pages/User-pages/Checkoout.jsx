import React, { useState } from "react";
import {
  ArrowLeft, CreditCard, Truck, ShieldCheck,
  Banknote, ChevronRight, Lock, MapPin,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useItem } from "../../context/CartContext";
import axios from 'axios';
import { PORT } from "../../utils/constand";

// Helper to load Razorpay SDK
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const { items } = useItem();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    email: "", 
    address: "",
    city: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.pinCode) {
      alert("Please fill in your shipping details.");
      return;
    }

    setLoading(true);

    try {
      const resLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!resLoaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        setLoading(false);
        return;
      }

      const res = await axios.post(`/order/checkout`, { 
        items, 
        shippingAddress,
      }, { withCredentials: true });

      if (!res.data || !res.data.key) {
        alert("Server error. Could not initiate payment.");
        setLoading(false);
        return;
      }

      const options = {
        key: res.data.key,
        amount: res.data.amount,
        currency: "INR",
        name: "LUXORA",
        description: "Purchase Transaction",
        order_id: res.data.order_id, 
        handler: async function (response) {
          try {
             const verifyRes = await axios.post(`/order/verifyPayment`, {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                items, 
                shippingAddress
             }, { withCredentials: true });

             if (verifyRes.data.success || verifyRes.status === 200) {
                 navigate("/paymentsuccess", { replace: true }); 
             }
          } catch (error) {
             console.error("Payment Verification Failed", error);
             alert("Payment successful but verification failed. Contact support.");
          }
        },
        prefill: {
          name: shippingAddress.fullName,
          email: shippingAddress.email,
          contact: shippingAddress.phone
        },
        theme: {
          color: "#F37254"
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
    } catch (error) {
      console.error("Payment Error:", error);
      if (error.response?.status === 403) {
        navigate("/login", { replace: true });
      } else {
        alert("Something went wrong processing the order.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans antialiased relative overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed top-[-20%] right-[-10%] w-[70%] h-[70%] bg-amber-100/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-50/40 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 px-4 pt-6 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8 md:pt-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-xs font-medium md:mb-8 md:text-sm text-stone-500 animate-in fade-in slide-in-from-left-4">
          <button onClick={() => navigate("/cart")} className="flex items-center gap-1 transition-colors hover:text-stone-900">
            <ArrowLeft size={14} /> Cart
          </button>
          <ChevronRight size={14} className="text-stone-300" />
          <span className="font-bold text-stone-900">Checkout</span>
        </div>

        {/* Responsive Grid: Stacks on mobile, Side-by-side on desktop */}
        <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          
          {/* --- LEFT COLUMN: Forms --- */}
          {/* Takes full width on mobile, 7 cols on desktop */}
          <div className="space-y-6 md:space-y-8 lg:col-span-7 animate-in slide-in-from-bottom-8">
            
            {/* 1. Contact Info */}
            <section className="p-5 border shadow-sm md:p-8 bg-white/60 backdrop-blur-md border-stone-100 rounded-3xl md:rounded-4xl">
              <h2 className="flex items-center gap-2 mb-4 font-serif text-lg md:text-xl text-stone-900 md:mb-6">
                <span className="flex items-center justify-center w-6 h-6 font-sans text-xs font-bold text-white rounded-full bg-stone-900">1</span>
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={shippingAddress.email} 
                    onChange={handleChange} 
                    placeholder="you@example.com" 
                    className="w-full px-4 py-3 text-sm transition-all border outline-none bg-stone-50/50 border-stone-200 rounded-xl text-stone-800 focus:bg-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 placeholder:text-stone-300"
                  />
                </div>
                 <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">Phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleChange}
                    placeholder="9876543210" 
                    className="w-full px-4 py-3 text-sm transition-all border outline-none bg-stone-50/50 border-stone-200 rounded-xl text-stone-800 focus:bg-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 placeholder:text-stone-300"
                  />
                </div>
              </div>
            </section>

            {/* 2. Shipping Address */}
            <section className="p-5 border shadow-sm md:p-8 bg-white/60 backdrop-blur-md border-stone-100 rounded-3xl md:rounded-4xl">
              <h2 className="flex items-center gap-2 mb-4 font-serif text-lg md:text-xl text-stone-900 md:mb-6">
                <span className="flex items-center justify-center w-6 h-6 font-sans text-xs font-bold text-white rounded-full bg-stone-900">2</span>
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={shippingAddress.fullName} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 text-sm transition-all border outline-none bg-stone-50/50 border-stone-200 rounded-xl focus:bg-white focus:border-amber-400" 
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">Address</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="address" 
                      value={shippingAddress.address} 
                      onChange={handleChange} 
                      placeholder="Street, Apartment, Suite" 
                      className="w-full py-3 pl-10 pr-4 text-sm transition-all border outline-none bg-stone-50/50 border-stone-200 rounded-xl focus:bg-white focus:border-amber-400 placeholder:text-stone-300" 
                    />
                    <MapPin size={16} className="absolute -translate-y-1/2 left-3.5 top-1/2 text-stone-400" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">City</label>
                    <input 
                      type="text" 
                      name="city" 
                      value={shippingAddress.city} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 text-sm transition-all border outline-none bg-stone-50/50 border-stone-200 rounded-xl focus:bg-white focus:border-amber-400" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">PIN Code</label>
                    <input 
                      type="text" 
                      name="pinCode" 
                      value={shippingAddress.pinCode} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 text-sm transition-all border outline-none bg-stone-50/50 border-stone-200 rounded-xl focus:bg-white focus:border-amber-400" 
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Payment Method */}
            <section className="p-5 border shadow-sm md:p-8 bg-white/60 backdrop-blur-md border-stone-100 rounded-3xl md:rounded-4xl">
              <h2 className="flex items-center gap-2 mb-4 font-serif text-lg md:text-xl text-stone-900 md:mb-6">
                <span className="flex items-center justify-center w-6 h-6 font-sans text-xs font-bold text-white rounded-full bg-stone-900">3</span>
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className={`flex items-center p-3 md:p-4 border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'bg-amber-50/50 border-amber-200 shadow-sm' : 'bg-white/50 border-stone-200 hover:border-stone-300'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="card" 
                    checked={paymentMethod === 'card'} 
                    onChange={() => setPaymentMethod('card')}
                    className="w-4 h-4 text-stone-900 border-stone-300 focus:ring-stone-900 accent-stone-900"
                  />
                  <div className="flex items-center flex-1 gap-3 ml-3 md:ml-4">
                    <div className={`p-2 rounded-lg border shadow-sm ${paymentMethod === 'card' ? 'bg-white border-amber-100 text-amber-600' : 'bg-stone-50 border-stone-100 text-stone-400'}`}>
                      <CreditCard size={18} />
                    </div>
                    <span className="text-xs font-bold md:text-sm text-stone-700">Online Payment (Razorpay)</span>
                  </div>
                </label>

                <label className={`flex items-center p-3 md:p-4 border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'bg-amber-50/50 border-amber-200 shadow-sm' : 'bg-white/50 border-stone-200 hover:border-stone-300'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod" 
                    checked={paymentMethod === 'cod'} 
                    onChange={() => setPaymentMethod('cod')}
                    className="w-4 h-4 text-stone-900 border-stone-300 focus:ring-stone-900 accent-stone-900"
                  />
                  <div className="flex items-center flex-1 gap-3 ml-3 md:ml-4">
                    <div className={`p-2 rounded-lg border shadow-sm ${paymentMethod === 'cod' ? 'bg-white border-amber-100 text-amber-600' : 'bg-stone-50 border-stone-100 text-stone-400'}`}>
                      <Banknote size={18} />
                    </div>
                    <span className="text-xs font-bold md:text-sm text-stone-700">Cash on Delivery</span>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* --- RIGHT COLUMN: Sticky Summary --- */}
          {/* Sticks to top on Desktop, Stacks at bottom on Mobile */}
          <div className="lg:sticky lg:col-span-5 top-8 animate-in slide-in-from-right-8 h-fit">
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[30px] md:rounded-[40px] p-6 md:p-8 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.05)] ring-1 ring-stone-50">
              
              <h3 className="mb-6 font-serif text-xl text-stone-900">Order Summary</h3>
              
              {/* Items List (Mini) - Scrollable */}
              <div className="pr-2 mb-6 space-y-4 overflow-y-auto max-h-48 custom-scrollbar">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    item.quantity > 0 && (
                      <div key={index} className="flex items-center gap-3 group">
                        <div className="relative w-12 h-12 overflow-hidden border border-stone-200 rounded-xl bg-stone-100 shrink-0">
                          <img src={item.url} alt={item.name} className="object-cover w-full h-full" />
                          <span className="absolute bottom-0 right-0 bg-stone-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-tl-lg">{item.quantity}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium truncate sm:text-sm text-stone-900">{item.name}</h4>
                          <p className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">{item.category}</p>
                        </div>
                        <p className="text-xs font-bold sm:text-sm text-stone-900">{formatINR(item.price * item.quantity)}</p>
                      </div>
                    )
                  ))
                ) : (
                  <p className="py-4 text-sm italic text-center text-stone-400">Your cart is empty.</p>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="pt-6 space-y-3 border-t border-stone-200/50">
                <div className="flex justify-between text-sm text-stone-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-stone-500">
                  <span>Shipping</span>
                  <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full">Free</span>
                </div>
                <div className="flex justify-between text-sm text-stone-500">
                  <span>Tax (18%)</span>
                  <span className="font-medium text-stone-900">{formatINR(tax)}</span>
                </div>
              </div>

              <div className="flex items-end justify-between pt-6 mt-6 border-t border-stone-200">
                <span className="text-sm font-bold tracking-widest uppercase text-stone-900">Total</span>
                <span className="font-serif text-2xl text-stone-900">{formatINR(total)}</span>
              </div>

              {/* Confirm Button */}
              <button 
                onClick={handlePayment}
                disabled={loading || items.length === 0}
                className="relative flex items-center justify-center w-full gap-3 px-8 py-4 mt-8 overflow-hidden transition-all duration-500 rounded-full shadow-xl group bg-stone-900 hover:shadow-amber-500/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                 {loading ? (
                    <Loader2 size={20} className="text-white animate-spin" />
                 ) : (
                    <>
                      <span className="relative z-10 text-xs font-bold text-white uppercase tracking-[0.25em] group-hover:text-amber-200 transition-colors">Confirm Order</span>
                      <div className="absolute inset-0 bg-linear-to-r from-stone-800 to-stone-900" />
                      <div className="absolute inset-0 transition-transform duration-1000 ease-in-out -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full" />
                      <Lock size={14} className="relative z-10 transition-colors text-stone-400 group-hover:text-white" />
                    </>
                 )}
              </button>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="flex items-center gap-1.5 text-stone-400">
                  <ShieldCheck size={14} />
                  <span className="text-[9px] font-bold uppercase tracking-wider">Secure SSL</span>
                </div>
                <div className="w-px h-3 bg-stone-200" />
                <div className="flex items-center gap-1.5 text-stone-400">
                  <Truck size={14} />
                  <span className="text-[9px] font-bold uppercase tracking-wider">Fast Delivery</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;