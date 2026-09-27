import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PackagePlus,
  ShoppingBag,
  Users,
  ScrollText,
  Shield,
  Palette,
  Menu,
  X,
  LogOut,
  ChevronRight
} from "lucide-react";

const AdminNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation Data
  const navItems = [
    { id: "/admin/product", label: "Products", icon: ShoppingBag },
    { id: "/admin/newproduct", label: "New Product", icon: PackagePlus },
    { id: "/admin/users", label: "Users", icon: Users },
    { id: "/admin/orders", label: "Orders", icon: ScrollText },
    { id: "/admin/sitevisuals", label: "Visuals", icon: Palette },
  ];

  // Determine active page
  const activePage = navItems.find((item) => location.pathname.startsWith(item.id))?.id || "/admin/products";

  const handleNavClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b shadow-sm bg-white/90 backdrop-blur-xl border-amber-100/50">
        <div className="px-4 mx-auto max-w-[1920px] sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* 1. BRAND LOGO (Left) */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleNavClick("/admin/products")}
            >
              <div className="p-2 transition-transform border rounded-lg shadow-sm bg-gradient-to-br from-amber-50 to-white border-amber-100 group-hover:scale-105">
                <Shield
                  size={20}
                  className="text-amber-600"
                  strokeWidth={2.5}
                />
              </div>
              <div>
                <h1 className="text-lg font-light leading-none tracking-tight text-stone-900">
                  Admin{" "}
                  <span className="font-serif italic font-medium text-amber-600">
                    Console
                  </span>
                </h1>
              </div>
            </div>

            {/* 2. DESKTOP NAVIGATION (Center - Hidden on Mobile) */}
            <div className="items-center justify-center flex-1 hidden px-8 lg:flex">
              <div className="relative inline-flex p-1 border rounded-full shadow-inner bg-stone-100/60 border-stone-200/50">
                {navItems.map((item) => {
                  const isActive = activePage === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-bold tracking-wide transition-all duration-300 ease-out z-10 ${
                        isActive
                          ? "text-stone-900"
                          : "text-stone-400 hover:text-stone-600"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-white rounded-full shadow-[0_1px_8px_-2px_rgba(0,0,0,0.08)] border border-stone-100 -z-10 animate-in zoom-in-95 duration-200" />
                      )}
                      <Icon
                        size={14}
                        strokeWidth={isActive ? 2.5 : 2}
                        className={
                          isActive
                            ? "text-amber-500"
                            : "text-stone-400 group-hover:text-stone-500"
                        }
                      />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. DESKTOP ACTIONS (Right - Hidden on Mobile) */}
            <div className="items-center hidden gap-6 lg:flex">
              <div className="flex items-center gap-3 pl-6 border-l border-stone-200">
                <div className="hidden text-right xl:block">
                  <p className="text-xs font-bold text-stone-900">Admin User</p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider">Super Admin</p>
                </div>
                <div className="w-9 h-9 rounded-full border border-amber-200 p-0.5 cursor-pointer hover:shadow-md transition-shadow">
                    <img
                        src="https://i.pravatar.cc/150?u=admin"
                        alt="Admin"
                        className="object-cover w-full h-full rounded-full"
                    />
                </div>
              </div>
              <button className="p-2 transition-colors text-stone-400 bg-stone-50 rounded-xl hover:bg-red-50 hover:text-red-500">
                <LogOut size={18} />
              </button>
            </div>

            {/* 4. MOBILE MENU TOGGLE (Visible on Mobile Only) */}
            <div className="flex items-center gap-4 lg:hidden">
                 {/* Mini Profile for Mobile Header */}
                 <div className="w-8 h-8 rounded-full border border-stone-200 p-0.5">
                    <img src="https://i.pravatar.cc/150?u=admin" className="w-full h-full rounded-full" alt="profile"/>
                 </div>
                 
                 <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 transition-colors border rounded-lg bg-stone-50 border-stone-100 text-stone-500 hover:bg-amber-50 hover:text-amber-600 active:scale-95"
                 >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                 </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE MENU DRAWER --- */}
      {/* - fixed inset-x-0 top-16: Positions it exactly below navbar
          - max-h-[calc(100vh-4rem)]: Ensures it doesn't get cut off on small screens
          - overflow-y-auto: Allows scrolling inside the menu if items are too many
      */}
      <div
        className={`fixed inset-x-0 top-16 z-40 lg:hidden transition-all duration-300 ease-in-out transform origin-top
            ${isMobileMenuOpen 
                ? "translate-y-0 opacity-100 scale-y-100" 
                : "-translate-y-4 opacity-0 scale-y-95 pointer-events-none"
            }`}
      >
        <div className="relative bg-white/95 backdrop-blur-2xl border-b border-amber-100/50 shadow-xl max-h-[85vh] overflow-y-auto">
          
          {/* Decorative background blob */}
          <div className="absolute top-0 right-0 w-[60%] h-full bg-amber-50/40 rounded-full blur-[100px] pointer-events-none -z-10" />

          <div className="flex flex-col p-4 space-y-6">
            
            {/* Nav Links */}
            <div className="space-y-1">
              <p className="px-2 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-3">
                Navigation
              </p>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-xs font-bold transition-all ${
                    activePage === item.id
                      ? "bg-white text-stone-900 shadow-sm border border-amber-100"
                      : "text-stone-500 hover:bg-white/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${activePage === item.id ? "bg-amber-50 text-amber-600" : "bg-stone-100 text-stone-400"}`}
                      >
                        <item.icon size={16} />
                      </div>
                      <span className="text-sm">{item.label}</span>
                  </div>
                  {activePage === item.id && <ChevronRight size={14} className="text-amber-400"/>}
                </button>
              ))}
            </div>

            {/* Mobile Footer Area */}
            <div className="pt-4 border-t border-stone-100">
               <div className="flex items-center justify-between p-3 mb-4 border border-stone-100 rounded-2xl bg-stone-50/50">
                  <div className="flex items-center gap-3">
                      <img src="https://i.pravatar.cc/150?u=admin" alt="admin" className="w-10 h-10 border border-white rounded-full shadow-sm"/>
                      <div className="text-left">
                          <p className="text-sm font-bold text-stone-900">Admin User</p>
                          <p className="text-[10px] font-medium text-stone-400">admin@luxora.com</p>
                      </div>
                  </div>
               </div>
               
              <button className="flex items-center justify-center w-full gap-2 py-3 text-xs font-bold text-red-500 transition-colors bg-red-50 rounded-xl hover:bg-red-100">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
            
          </div>
        </div>
        
        {/* Backdrop for mobile menu (closes on click) */}
        {isMobileMenuOpen && (
            <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden h-screen mt-[64px]" />
        )}
      </div>
      {/* Spacer to push content down */}
      <div className="h-16" />
    </>
  );
};

export default AdminNavbar;