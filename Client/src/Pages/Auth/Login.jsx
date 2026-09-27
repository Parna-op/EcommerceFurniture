import React, { useState } from "react";
import { ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
 const { isLoggedIn,setIsLoggedIn ,isAdmin,setAdmin } = useAuth()
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`/auth/login`, formData ,{ withCredentials: true } );
      
      console.log("Login Success:", res.data);
      console.log(res.status);
      
      if (res.status === 200 ){
        navigate("/", { replace: true });
        setIsLoggedIn(true)
      }
      if (res.role === "admin"){
        setAdmin(true)
        
      }
      

    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans antialiased flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed top-[-20%] right-[-10%] w-[70%] h-[70%] bg-amber-100/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-stone-100/40 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-4xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] p-8 sm:p-12 animate-in zoom-in-95 duration-500">
          
          <div className="mb-10 text-center">
            <h1 className="mb-2 font-serif text-3xl tracking-wide text-stone-900">Welcome Back</h1>
            <p className="text-sm font-medium text-stone-500">Sign in to continue your experience</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Input */}
            <div className="space-y-2">
               <label className="ml-1 text-sm font-medium text-stone-600">Email address</label>
               <input 
                 type="email"
                 required
                 autoComplete="current-password"
                 placeholder="you@example.com"
                 value={formData.email} // Controlled input
                 className="w-full px-5 py-3.5 bg-white border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-400 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 shadow-sm"
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
               />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
               <label className="ml-1 text-sm font-medium text-stone-600">Password</label>
               <div className="relative">
                 {/* <button 
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute inset-y-0 left-0 z-10 flex items-center pl-4 pr-2 cursor-pointer text-stone-400 hover:text-stone-600"
                 >
                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                 </button> */}

                 <input 
                   type={showPassword ? "text" : "password"}
                   required
                   autoComplete="current-password"
                   placeholder="••••••••"
                   value={formData.password} // FIX: Added value to make it controlled
                   className="w-full pl-12 pr-5 py-3.5 bg-white border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-400 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 shadow-sm"
                   onChange={(e) => setFormData({...formData, password: e.target.value})}
                 />
               </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="relative flex items-center justify-center w-full gap-3 px-8 py-4 overflow-hidden transition-all duration-500 shadow-xl group bg-stone-900 rounded-2xl hover:shadow-amber-500/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-linear-to-r from-stone-800 to-stone-900" />
              <div className="absolute inset-0 transition-transform duration-1000 ease-in-out -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full" />
              
              <span className="relative z-10 text-xs font-bold text-white uppercase tracking-[0.25em] group-hover:text-amber-200 transition-colors">
                {loading ? "Verifying..." : "Sign In "}
              </span>
              
              {loading ? (
                <Loader2 size={16} className="relative z-10 text-white animate-spin" />
              ) : (
                <ArrowRight size={16} className="relative z-10 transition-colors text-stone-400 group-hover:text-white group-hover:translate-x-1" />
              )}
            </button>

          </form>

          <div className="mt-8 text-center">
             <p className="text-sm text-stone-500">
                Don't have an account? <Link to="/Signup" className="font-medium text-stone-900 hover:underline">Create one</Link>
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
{/* <Link to="/login" className="font-medium text-stone-900 hover:underline">Sign In</Link> */}