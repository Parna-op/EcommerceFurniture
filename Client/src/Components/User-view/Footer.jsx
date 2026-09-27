import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const shopLinks = [
    { name: "Living Room", path: "/products?category=living" },
    { name: "Bedroom", path: "/products?category=bedroom" },
    { name: "Dining Room", path: "/products?category=dining" },
    { name: "Home Office", path: "/products?category=office" },
    { name: "Outdoor", path: "/products?category=outdoor" },
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
    { name: "Shipping & Returns", path: "/shipping" },
    { name: "Care Guide", path: "/care-guide" },
  ];

  return (
    <footer className="w-full bg-[#0c0c0c] border-t border-white/10 pt-16 pb-8 md:pt-24 md:pb-12">
      <div className="mx-auto w-full max-w-[1920px] px-4 xs:px-6 sm:px-8 lg:px-12">
        
        {/* --- TOP SECTION: Newsletter & Branding --- */}
        <div className="flex flex-col gap-10 pb-16 border-b lg:flex-row lg:items-center lg:justify-between border-white/10 md:pb-20">
          
          <div className="max-w-xl">
            <h2 className="mb-4 font-serif text-3xl tracking-wide text-white sm:text-4xl">
              Join the LUXORA Club
            </h2>
            <p className="text-sm leading-relaxed text-white/60 sm:text-base">
              Subscribe to our newsletter to receive exclusive offers, new collection previews, and interior design inspiration.
            </p>
          </div>

          <div className="w-full max-w-md">
            <form className="relative flex items-center w-full" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full py-4 pl-6 pr-16 text-sm text-white transition-all bg-transparent border rounded-full border-white/20 placeholder-white/40 focus:outline-none focus:border-[#c9a24d]/60 focus:bg-white/5"
                required
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-[#c9a24d] text-black rounded-full hover:bg-[#b08d3b] transition-colors active:scale-95"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* --- MIDDLE SECTION: Links Grid --- */}
        <div className="grid grid-cols-1 gap-12 py-16 xs:grid-cols-2 lg:grid-cols-4 md:py-20">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-6">
            <NavLink to="/" className="font-serif text-2xl tracking-widest text-white">
              LUXORA
            </NavLink>
            <p className="text-sm leading-relaxed text-white/60">
              Elevating everyday spaces with meticulously crafted, modern furniture designed for ultimate comfort and enduring style.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="p-2 transition-colors border rounded-full border-white/20 text-white/70 hover:text-[#c9a24d] hover:border-[#c9a24d]/50">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 transition-colors border rounded-full border-white/20 text-white/70 hover:text-[#c9a24d] hover:border-[#c9a24d]/50">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 transition-colors border rounded-full border-white/20 text-white/70 hover:text-[#c9a24d] hover:border-[#c9a24d]/50">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop Links */}
          <div className="flex flex-col gap-6 lg:pl-8 xl:pl-16">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase">Shop</h3>
            <ul className="flex flex-col gap-4">
              {shopLinks.map((link, idx) => (
                <li key={idx}>
                  <NavLink 
                    to={link.path} 
                    className="text-sm transition-colors text-white/60 hover:text-[#c9a24d]"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase">Company</h3>
            <ul className="flex flex-col gap-4">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <NavLink 
                    to={link.path} 
                    className="text-sm transition-colors text-white/60 hover:text-[#c9a24d]"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase">Contact</h3>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-5 h-5 shrink-0 text-[#c9a24d]" />
                <span>123 Luxury Avenue, Suite 400<br/>New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-5 h-5 shrink-0 text-[#c9a24d]" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-5 h-5 shrink-0 text-[#c9a24d]" />
                <a href="mailto:support@luxora.com" className="transition-colors hover:text-[#c9a24d]">
                  support@luxora.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* --- BOTTOM SECTION: Copyright & Legal --- */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 border-t md:flex-row border-white/10">
          <p className="text-xs text-white/40">
            &copy; {currentYear} LUXORA Furniture. All rights reserved.
          </p>
          <div className="flex gap-6">
            <NavLink to="/privacy" className="text-xs transition-colors text-white/40 hover:text-white">
              Privacy Policy
            </NavLink>
            <NavLink to="/terms" className="text-xs transition-colors text-white/40 hover:text-white">
              Terms of Service
            </NavLink>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;