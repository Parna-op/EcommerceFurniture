import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  X,
  Search,
  LogOut,
  LogIn
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useItem } from "../../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, isAdmin, setisAdmin } = useAuth();
  const { items } = useItem();
  const [open, setOpen] = useState(false);

  // Logout Logic
  const onLogout = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.get(`/auth/logout`, { withCredentials: true });
      
      if (res.status === 200) {
        setIsLoggedIn(false);
        setisAdmin(false);
        setOpen(false);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log("Logout Error:", error.response?.data || error.message);
    }
  };

  const links = [
    { "key": 1, "page": "Home", "route": " " },
    { "key": 2, "page": "Products", "route": "Products" },
    { "key": 3, "page": "Contact", "route": "Contact" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c0c0c]/90 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      
      {/* --- NAVBAR CONTAINER --- */}
      <nav className="
        flex items-center justify-between 
        h-16 xs:h-[72px]  /* Slightly shorter on tiny phones */
        mx-auto
        //  w-full
          max-w-[1920px] 
        relative z-50
        /* Responsive Padding */
        px-6 xs:px-6 sm:px-8 lg:px-12
      ">

        {/* 1. LEFT – Logo */}
        <div className="shrink-0">
          <NavLink
            to="/"
            className="font-serif tracking-wide text-white transition-opacity hover:opacity-80
              text-xl xs:text-2xl /* Scale font on small devices */
            "
          >
            LUXORA
          </NavLink>
        </div>

        {/* 2. CENTER – Navigation (Desktop & Tablet) */}
        {/* Hidden on Mobile (<768px), Visible on Tablet+ */}
        <div className="absolute items-center hidden gap-6 -translate-x-1/2 left-1/2 md:flex lg:gap-10 xl:gap-12">
          {links.map((item, index) => (
            <NavLink
              key={index}
              to={`/${item.route.toLowerCase().replace(" ", "")}`}
              className={({ isActive }) =>
                `text-[10px] lg:text-xs uppercase tracking-[0.2em] transition-all duration-300 font-medium
                 ${isActive ? "text-[#c9a24d]" : "text-white/70 hover:text-white"}`
              }
            >
              {item.page}
            </NavLink>
          ))}
          
          {isAdmin && (
            <NavLink
              to={`/Admin/product`}
              className={({ isActive }) =>
                `text-[10px] lg:text-xs uppercase tracking-[0.2em] transition-all duration-300 font-medium
                 ${isActive ? "text-[#c9a24d]" : "text-white/70 hover:text-white"}`
              }
            >
              Dashboard
            </NavLink>
          )}
        </div>

        {/* 3. RIGHT – Actions */}
        <div className="flex items-center gap-4 xs:gap-5 sm:gap-6">

          {/* Search Bar: Visible ONLY on Large Desktop (lg+) */}
          <div className="relative hidden lg:block">
            <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search"
              className="w-[180px] xl:w-[220px] bg-white/5 border border-white/10 rounded-full
                         pl-9 pr-4 py-2 text-sm text-white
                         placeholder-white/40 transition-all duration-300
                         focus:outline-none focus:border-[#c9a24d]/60 focus:bg-white/10"
            />
          </div>
          
          {/* Search Icon: Visible on Tablet (md) but hidden on Desktop (lg) */}
          {/* On mobile, search is inside the hamburger menu */}
          <button className="hidden md:block lg:hidden text-white/70 hover:text-[#c9a24d]">
             <Search className="w-5 h-5" />
          </button>

          {/* Cart Icon */}
          <NavLink
            to="/cart"
            className="relative text-white/70 hover:text-[#c9a24d] transition duration-300"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            {items && items.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#c9a24d] text-[10px] font-bold text-black animate-in zoom-in">
                {items.length}
              </span>
            )}
          </NavLink>

          {/* Login/Logout: Visible on Tablet+ (md+) */}
          <div className="hidden md:block">
            {!isLoggedIn ? (
              <NavLink
                to="/login"
                className="px-5 py-2 text-[10px] lg:text-xs uppercase tracking-widest border border-[#c9a24d]/40 text-[#c9a24d] hover:bg-[#c9a24d] hover:text-black transition duration-300 rounded-full"
              >
                Login
              </NavLink>
            ) : (
              <button
                onClick={onLogout}
                className="px-5 py-2 text-[10px] lg:text-xs tracking-widest uppercase transition duration-300 border rounded-full border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle: Visible ONLY on Mobile (< md) */}
          <button
            onClick={() => setOpen(!open)}
            className="p-1 text-white transition-transform md:hidden focus:outline-none active:scale-90"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* ===========================================
        4. MOBILE MENU (Pop Down)
        Visible only when open state is true AND screen is < md
        ===========================================
      */}
      {open && (
        <>
          {/* Backdrop Overlay */}
          <div 
            onClick={() => setOpen(false)}
            className="md:hidden fixed inset-0 top-16 xs:top-[72px] bg-black/60 backdrop-blur-sm z-30"
          />

          {/* The Menu Content */}
          <div className="
            md:hidden absolute left-0 z-40 
            w-full 
            top-16 xs:top-[72px]
            bg-[#0c0c0c] border-b border-white/10 
            shadow-2xl shadow-black/50
            overflow-hidden
            animate-in slide-in-from-top-2 duration-200 ease-out
          ">
            
            <div className="px-8 py-6 space-y-6 xs:px-6">
              
              {/* Mobile Search */}
              <div className="relative group">
                <Search className="absolute w-4 h-4 left-4 top-3.5 text-white/40 group-focus-within:text-[#c9a24d] transition-colors" />
                <input
                  type="text"
                  placeholder="Search collection..."
                  className="w-full py-3 pr-4 text-sm text-white border rounded-xl bg-white/5 border-white/10 pl-11 placeholder-white/40 focus:outline-none focus:border-[#c9a24d]/50 focus:bg-white/10 transition-all"
                />
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col gap-1">
                {links.map((item, index) => (
                  <NavLink
                    key={index}
                    to={`/${item.route.toLowerCase().replace(" ", "")}`}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center justify-between px-4 py-3 rounded-lg transition-all
                       ${isActive 
                         ? "bg-white/10 text-[#c9a24d]" 
                         : "text-white/70 hover:bg-white/5 hover:text-white"}`
                    }
                  >
                    <span className="text-sm font-medium tracking-widest uppercase">{item.page}</span>
                  </NavLink>
                ))}
                
                {isAdmin && (
                   <NavLink
                   to="/Admin/product"
                   onClick={() => setOpen(false)}
                   className="flex items-center justify-between px-4 py-3 transition-all rounded-lg text-white/70 hover:bg-white/5 hover:text-white"
                 >
                   <span className="text-sm font-medium tracking-widest uppercase">Dashboard</span>
                 </NavLink>
                )}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="pt-6 border-t border-white/10">
                {!isLoggedIn ? (
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center w-full gap-3 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-black transition-transform bg-[#c9a24d] rounded-lg hover:bg-[#b08d3b] active:scale-95"
                  >
                    <LogIn size={16} /> Login
                  </NavLink>
                ) : (
                  <button
                    onClick={onLogout}
                    className="flex items-center justify-center w-full gap-3 px-6 py-3.5 text-xs font-bold tracking-widest text-white uppercase transition-colors border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/40"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;