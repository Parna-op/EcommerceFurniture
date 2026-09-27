import React, { useState } from "react";
import { ArrowRight, Loader2, User, Mail, Lock, AlertCircle } from "lucide-react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isLoggedIn,setIsLoggedIn}=useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`/auth/signup`, 
        // {
        //   name: formData.fullName,
        //   email: formData.email,
        //   password: formData.password
        // }, 
        formData,
        { withCredentials: true }
      );
      
      console.log("Registration Success:", res.data);

      if (res.status === 201 || res.status === 200) {
        navigate("/", { replace: true });
        setIsLoggedIn(true)
      }

    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans antialiased flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Ambience (Same as Login) */}
      <div className="fixed top-[-20%] right-[-10%] w-[70%] h-[70%] bg-amber-100/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-stone-100/40 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-4xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] p-8 sm:p-12 animate-in zoom-in-95 duration-500">
          
          <div className="mb-8 text-center">
            <h1 className="mb-2 font-serif text-3xl tracking-wide text-stone-900">Create Account</h1>
            <p className="text-sm font-medium text-stone-500">Join us to start your journey</p>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="flex items-center gap-2 p-3 mb-6 text-sm text-red-600 border border-red-100 rounded-xl bg-red-50 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name Input */}
            <div className="space-y-1">
               <label className="ml-1 text-sm font-medium text-stone-600">Full Name</label>
               <div className="relative group">
                 <User size={18} className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-stone-400 group-focus-within:text-amber-500" />
                 <input 
                   type="text"
                   required
                   placeholder="John Doe"
                   value={formData.fullName}
                   className="w-full pl-12 pr-5 py-3.5 bg-white border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-400 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 shadow-sm"
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                 />
               </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1">
               <label className="ml-1 text-sm font-medium text-stone-600">Email address</label>
               <div className="relative group">
                 <Mail size={18} className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-stone-400 group-focus-within:text-amber-500" />
                 <input 
                   type="email"
                   required
                   placeholder="you@example.com"
                   value={formData.email}
                   className="w-full pl-12 pr-5 py-3.5 bg-white border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-400 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 shadow-sm"
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                 />
               </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
               <label className="ml-1 text-sm font-medium text-stone-600">Password</label>
               <div className="relative group">
                 <Lock size={18} className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-stone-400 group-focus-within:text-amber-500" />
                 <input 
                   type="password"
                   required
                   placeholder="Create a password"
                   value={formData.password}
                   className="w-full pl-12 pr-5 py-3.5 bg-white border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-400 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 shadow-sm"
                   onChange={(e) => setFormData({...formData, password: e.target.value})}
                 />
               </div>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-1">
               <label className="ml-1 text-sm font-medium text-stone-600">Confirm Password</label>
               <div className="relative group">
                 <Lock size={18} className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-stone-400 group-focus-within:text-amber-500" />
                 <input 
                   type="password"
                   required
                   placeholder="Confirm your password"
                   value={formData.confirmPassword}
                   className="w-full pl-12 pr-5 py-3.5 bg-white border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-400 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 shadow-sm"
                   onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                 />
               </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="relative flex items-center justify-center w-full gap-3 px-8 py-4 mt-6 overflow-hidden transition-all duration-500 shadow-xl group bg-stone-900 rounded-2xl hover:shadow-amber-500/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-linear-to-r from-stone-800 to-stone-900" />
              <div className="absolute inset-0 transition-transform duration-1000 ease-in-out -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full" />
              
              <span className="relative z-10 text-xs font-bold text-white uppercase tracking-[0.25em] group-hover:text-amber-200 transition-colors">
                {loading ? "Creating Account..." : "Register"}
              </span>
              
              {loading ? (
                <Loader2 size={16} className="relative z-10 text-white animate-spin" />
              ) : (
                <ArrowRight size={16} className="relative z-10 transition-colors text-stone-400 group-hover:text-white group-hover:translate-x-1" />
              )}
            </button>

          </form>

          {/* <div className="mt-8 text-center">
             <p className="text-sm text-stone-500">
                Already have an account? <Link to="/login" className="font-medium text-stone-900 hover:underline">Sign In</Link>
             </p>
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default Register;
