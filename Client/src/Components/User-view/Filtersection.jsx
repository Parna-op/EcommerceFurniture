import React, { useState } from "react";
import { 
  ChevronDown, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  Search 
} from "lucide-react";

const PremiumFilter = () => {
  const [view, setView] = useState("grid"); // 'grid' or 'list'

  return (
    <div className="sticky top-0 z-40 w-full transition-all duration-300 border-b bg-white/95 backdrop-blur-md border-stone-200">
      
      {/* Top Row: Context & Sort */}
      <div className="max-w-[1920px] mx-auto px-6 sm:px-12 h-[60px] flex items-center justify-between border-b border-stone-100">
        
        {/* Left: Breadcrumb / Count */}
        <div className="flex items-center gap-4">
          <span className="font-serif text-xl tracking-wide text-stone-900">Living Room</span>
          <span className="w-[1px] h-4 bg-stone-300 hidden sm:block"></span>
          <span className="hidden text-xs font-medium tracking-widest uppercase text-stone-500 sm:block">
            142 Items
          </span>
        </div>

        {/* Right: Sort & View Toggle */}
        <div className="flex items-center gap-6">
          {/* Sort Dropdown */}
          <div className="items-center hidden gap-2 cursor-pointer md:flex group">
            <span className="text-xs font-medium tracking-widest uppercase transition-colors text-stone-500 group-hover:text-[#C9A24D]">Sort By:</span>
            <div className="relative">
              <select className="pr-6 text-xs font-bold tracking-wider uppercase bg-transparent outline-none appearance-none cursor-pointer text-stone-900 group-hover:text-[#C9A24D] transition-colors">
                <option>Featured</option>
                <option>Newest Arrivals</option>
                <option>Price: High to Low</option>
              </select>
              <ChevronDown size={12} className="absolute right-0 -translate-y-1/2 pointer-events-none top-1/2 text-stone-900 group-hover:text-[#C9A24D] transition-colors" />
            </div>
          </div>

          {/* View Toggles (Active state uses Gold) */}
          <div className="flex items-center gap-2 pl-6 border-l border-stone-200">
            <button 
              onClick={() => setView("grid")}
              className={`p-2 transition-colors duration-300 ${
                view === 'grid' 
                ? 'text-[#C9A24D]' // Gold when active
                : 'text-stone-300 hover:text-[#C9A24D]' // Gold on hover
              }`}
            >
              <LayoutGrid size={18} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => setView("list")}
              className={`p-2 transition-colors duration-300 ${
                view === 'list' 
                ? 'text-[#C9A24D]' 
                : 'text-stone-300 hover:text-[#C9A24D]'
              }`}
            >
              <List size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>


      {/* Bottom Row: The Filters */}
      <div className="max-w-[1920px] mx-auto px-6 sm:px-12 py-4 flex items-center gap-4 overflow-x-auto no-scrollbar">
        
        {/* Filter Trigger (Main) - Black button that turns Gold on Hover */}
        <button className="flex items-center gap-3 px-5 py-2.5 bg-[#1a1a1a] text-white hover:bg-[#C9A24D] hover:text-white transition-all duration-300 shrink-0 shadow-sm">
          <SlidersHorizontal size={14} />
          <span className="text-xs font-bold uppercase tracking-[0.15em]">All Filters</span>
        </button>

        <div className="w-[1px] h-8 bg-stone-200 mx-2 shrink-0"></div>

        {/* Individual Quick Filters */}
        <div className="flex items-center gap-3">
            
            {/* Category Dropdown */}
            <div className="relative group shrink-0">
               {/* Note: The select styling targets the border color on hover */}
                <select className="appearance-none pl-4 pr-10 py-2.5 bg-transparent border border-stone-300 hover:border-[#C9A24D] text-stone-600 hover:text-[#C9A24D] text-xs font-medium uppercase tracking-wider cursor-pointer transition-all duration-300 min-w-[120px] outline-none">
                    <option>Category</option>
                    <option>Sofas</option>
                    <option>Armchairs</option>
                </select>
                <ChevronDown size={12} className="absolute transition-colors duration-300 -translate-y-1/2 pointer-events-none right-3 top-1/2 text-stone-400 group-hover:text-[#C9A24D]" />
            </div>

            {/* Material Dropdown */}
            <div className="relative group shrink-0">
                <select className="appearance-none pl-4 pr-10 py-2.5 bg-transparent border border-stone-300 hover:border-[#C9A24D] text-stone-600 hover:text-[#C9A24D] text-xs font-medium uppercase tracking-wider cursor-pointer transition-all duration-300 min-w-[120px] outline-none">
                    <option>Material</option>
                    <option>Leather</option>
                    <option>Velvet</option>
                    <option>Linen</option>
                </select>
                <ChevronDown size={12} className="absolute transition-colors duration-300 -translate-y-1/2 pointer-events-none right-3 top-1/2 text-stone-400 group-hover:text-[#C9A24D]" />
            </div>

            {/* Price Dropdown */}
            <div className="relative group shrink-0">
                <select className="appearance-none pl-4 pr-10 py-2.5 bg-transparent border border-stone-300 hover:border-[#C9A24D] text-stone-600 hover:text-[#C9A24D] text-xs font-medium uppercase tracking-wider cursor-pointer transition-all duration-300 min-w-[120px] outline-none">
                    <option>Price</option>
                    <option>$0 - $500</option>
                    <option>$500 - $1000</option>
                    <option>$1000+</option>
                </select>
                <ChevronDown size={12} className="absolute transition-colors duration-300 -translate-y-1/2 pointer-events-none right-3 top-1/2 text-stone-400 group-hover:text-[#C9A24D]" />
            </div>

            {/* Color Swatch Filter */}
            <div className="flex items-center gap-2 px-4 py-2.5 border border-stone-300 shrink-0 hover:border-[#C9A24D] transition-colors duration-300 group cursor-pointer">
                <span className="text-xs font-medium tracking-wider uppercase text-stone-600 group-hover:text-[#C9A24D] transition-colors">Color</span>
                <div className="flex ml-2 -space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#2a2a2a] ring-1 ring-white"></div>
                    <div className="w-3 h-3 rounded-full bg-[#8B4513] ring-1 ring-white"></div>
                    <div className="w-3 h-3 rounded-full bg-[#F5F5DC] ring-1 ring-stone-300"></div>
                </div>
                <ChevronDown size={12} className="ml-2 text-stone-400 group-hover:text-[#C9A24D] transition-colors" />
            </div>
        </div>

        {/* Search Input (Focus state turns Gold) */}
        <div className="items-center hidden pb-1 ml-auto transition-colors duration-300 border-b xl:flex border-stone-300 focus-within:border-[#C9A24D] group">
            <Search size={14} className="text-stone-400 group-focus-within:text-[#C9A24D] transition-colors" />
            <input 
                type="text" 
                placeholder="Search Collection..." 
                className="bg-transparent border-none text-xs text-stone-800 placeholder-stone-400 focus:ring-0 w-[150px] ml-2"
            />
        </div>

      </div>
    </div>
  );
};

export default PremiumFilter;













    // <div classNameName="w-full p-4 space-y-6 bg-white shadow-md md:w-64 rounded-xl">

    //   {/* Category */}
    //   <div>
    //     <h3 classNameName="mb-2 font-semibold">Category</h3>
    //     {["Men", "Women", "Electronics"].map((cat) => (
    //       <label key={cat} classNameName="flex items-center gap-2">
    //         <input
    //           type="checkbox"
    //         //   checked={filters.category.includes(cat)}
    //           onChange={() =>
    //             setFilters((prev) => ({
    //               ...prev,
    //               category: prev.category.includes(cat)
    //                 ? prev.category.filter((c) => c !== cat)
    //                 : [...prev.category, cat],
    //             }))
    //           }
    //         />
    //         {cat}
    //       </label>
    //     ))}
    //   </div>

    //   {/* Price */}
    //   <div>
    //     <h3 classNameName="mb-2 font-semibold">Price Range</h3>
    //     <input
    //       type="range"
    //       min="0"
    //       max="5000"
    //       value={filters.price}
    //       onChange={(e) =>
    //         setFilters({ ...filters, price: e.target.value })
    //       }
    //       classNameName="w-full"
    //     />
    //     <p classNameName="mt-1 text-sm">Up to ₹{filters.price}</p>
    //   </div>

    //   {/* Rating */}
    //   <div>
    //     <h3 classNameName="mb-2 font-semibold">Rating</h3>
    //     {[4, 3, 2].map((r) => (
    //       <label key={r} classNameName="flex items-center gap-2">
    //         <input
    //           type="radio"
    //           name="rating"
    //           onChange={() =>
    //             setFilters({ ...filters, rating: r })
    //           }
    //         />
    //         {r}★ & above
    //       </label>
    //     ))}
    //   </div>

    //   {/* Availability */}
    //   <div>
    //     <label classNameName="flex items-center gap-2">
    //       <input
    //         type="checkbox"
    //         checked={filters.inStock}
    //         onChange={() =>
    //           setFilters({ ...filters, inStock: !filters.inStock })
    //         }
    //       />
    //       In Stock
    //     </label>
    //   </div>

    //   {/* Clear */}
    //   <button
    //     onClick={() =>
    //       setFilters({
    //         category: [],
    //         price: 5000,
    //         rating: null,
    //         inStock: false,
    //       })
    //     }
    //     classNameName="w-full py-2 text-white bg-black rounded-lg"
    //   >
    //     Clear Filters
    //   </button>
    // </div>

