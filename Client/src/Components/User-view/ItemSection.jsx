import React from 'react';
import Collection from '../../Components/Admin-view/Collection';

function ItemSection({ section,filteredProducts }) {
  return (
    <section 
      id="ItemSection" 
      className="w-full py-10 bg-white sm:py-16 lg:py-24"
    >
      
      {/* 1. TITLE SECTION 
          - Uses a max-width to prevent text from stretching too wide on 4k screens.
          - Centered text with responsive margins (mb-10 to mb-20).
      */}
      <div className="px-4 mx-auto mb-10 text-center max-w-7xl sm:px-6 lg:px-8 sm:mb-16 lg:mb-20">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
          {section || "Our Collection"}
        </h2>
        
        {/* Decorative Underline (Optional but adds a premium feel) */}
        <div className="w-16 h-1 mx-auto mt-3 bg-[#c9a24d] rounded-full sm:w-24 sm:mt-5 opacity-80" />
      </div>

      {/* 2. COLLECTION WRAPPER 
          - max-w-[1600px]: Matches the width inside your Collection component 
            to ensure the grid aligns perfectly on large screens.
          - px-4 sm:px-6: Ensures content doesn't touch the edges on mobile.
      */}
      <div className="w-full px-4 mx-auto max-w-[1600px] sm:px-6 lg:px-8">
        <Collection search={filteredProducts}/>     
      </div>
      
    </section>
  );
}

export default ItemSection;