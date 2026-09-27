import React from "react";
import { ArrowRight } from "lucide-react";
import CategoryChips from "./CategoryChips";
import heroImage from '../../assets/herosection.png';
import FeaturedSection from "./FeatureSection";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col w-full min-h-dvh">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <img
          src={heroImage}
          alt="Luxury modern living room with elegant furniture"
          className="object-cover w-full h-full"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(30_20%_8%/0.95)] via-[hsl(30_20%_8%/0.7)] to-[hsl(30_20%_8%/0.2)] sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(30_20%_8%)] via-transparent to-transparent opacity-90" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="
        relative z-10 flex flex-col justify-between w-full mx-auto grow max-w-7xl
        /* Responsive Spacing & Padding */
        px-4          /* Default (Small Mobile) */
        xs:px-6       /* Large Mobile */
        sm:px-8       /* Tablet */
        lg:px-12      /* Desktop */
        pt-24 pb-8    /* Header offset */
        xl:pt-36      /* Large Screen offset */
      ">
        
        {/* --- MAIN HERO CONTENT --- */}
        <div className="flex flex-col gap-0 xs:gap-10 lg:flex-row lg:items-start lg:justify-between">
          
          {/* 1. Hero Text Block */}
          <div className="w-full max-w-2xl animate-fade-in">
            <h1
              className="
                font-medium leading-[1.1] tracking-tight mb-6 
                text-transparent bg-clip-text bg-gradient-to-r from-orange-50 to-orange-100
                /* Typography Scaling */
                text-4xl        /* Mobile (<475px) */
                xs:text-5xl     /* Large Mobile (475px+) */
                sm:text-6xl     /* Tablet (640px+) */
                lg:text-7xl     /* Desktop (1024px+) */
              "
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              FURNITURE DESIGNED FOR
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-200 to-orange-200">
                MODERN LIVING
              </span>
            </h1>

            <p className="
              max-w-lg mb-8 sm:mb-10 text-[hsl(40_15%_60%)] leading-relaxed
              text-base       /* Mobile */
              xs:text-lg      /* Large Mobile */
              md:text-xl      /* Tablet/Desktop */
            ">
              Crafted with precision, designed for comfort, and built to elevate
              everyday spaces.
            </p>

            {/* CTA Button */}
            <button
              className="
                group
                flex items-center justify-center gap-3
                bg-linear-to-r from-orange-300 via-orange-200 to-orange-200
                hover:from-orange-200 hover:via-orange-300 hover:to-orange-300
                text-[hsl(30_20%_8%)]
                px-8 py-4 rounded-full font-medium text-base
                transition-all duration-300
                shadow-[0_4px_20px_rgba(0,0,0,0.2)]
                hover:shadow-[0_0_40px_hsl(35_60%_40%/0.3)]
                hover:scale-105 active:scale-95
                
          
              "
            >
              Shop Collection 
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* 2. Category Chips */}
          <div
            className="relative w-full mt-6 lg:w-auto lg:mt-0 lg:pl-10 animate-fade-in top-30"
            style={{ animationDelay: "0.2s" }}
          >
             <CategoryChips />
          </div>
        </div>

        {/* --- BOTTOM SECTION: Featured Section --- */}
        {/* - mt-12: Adds space on mobile so it doesn't touch the text above.
           - lg:mt-auto: Pushes it to the very bottom on desktop screens.
        */}
        <div className="w-full mt-16 lg:mt-auto xl:mt-24">
            <FeaturedSection/>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;