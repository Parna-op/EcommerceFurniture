import React, { useEffect, useState } from "react";
import { ShoppingCart, Plus, Minus, Star } from "lucide-react";
import axios from 'axios';
import { useItem } from '../../context/CartContext'; 

function Productlayout({ search }) {
  const { items, setItem } = useItem(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/product/${search}`);
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [search]);

  const handleAddToCart = (product) => {
    setItem((prev) => {
      const productId = product.id || product._id;
      const isExist = prev.some((item) => (item.id || item._id) === productId);
      if (isExist) {
        return prev.map((item) =>
          (item.id || item._id) === productId
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleDecrement = (productId) => {
    setItem((prev) => {
      return prev.map((item) => {
        if ((item.id || item._id) === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter((item) => item.quantity > 0); 
    });
  };

  const getProductQuantity = (productId) => {
    const foundItem = items.find((item) => (item.id || item._id) === productId);
    return foundItem ? foundItem.quantity : 0;
  };

  return (
    <div className="min-h-screen py-6 bg-gray-50 md:px-8 md:py-10">
      
      {/* LAYOUT CONTAINER:
        1. Mobile (Default): 'flex' + 'overflow-x-auto' = Horizontal Slider
        2. Desktop (md+): 'grid' = Standard Grid System
        
        'snap-x snap-mandatory': Ensures the slider locks products in place when scrolling.
        'no-scrollbar': (Optional) You can add a CSS utility to hide the scrollbar for cleaner look.
      */}
      <div className="
        flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4
        md:grid md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-4 md:overflow-visible md:px-0 md:pb-0
        max-w-[1600px] mx-auto scroll-smooth
      ">
        
        {loading ? (
           <div className="flex flex-col items-center justify-center w-full py-20 col-span-full">
             <div className="w-10 h-10 border-4 border-gray-200 border-t-[#c9a24d] rounded-full animate-spin mb-4"></div>
             <p className="text-sm font-medium text-gray-500 animate-pulse">Curating your collection...</p>
           </div>
        ) : products.map((product, index) => {
          const productId = product.id || product._id;
          const quantity = getProductQuantity(productId);

          return (
            <div 
              key={productId || index} 
              className="
                /* CARD WIDTH HANDLING */
                relative flex flex-col shrink-0 
                w-[85vw] sm:w-[45vw] md:w-auto 
                snap-center
                
                overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-xl 
                hover:shadow-xl hover:-translate-y-1 group
              "
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                <img
                  src={product.url}
                  alt={product.name}
                  className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Rating Badge */}
                {product.rating && (
                   <div className="absolute flex items-center gap-1 px-2 py-1 rounded-full shadow-sm top-2 left-2 bg-white/90 backdrop-blur-sm">
                     <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                     <span className="text-[10px] sm:text-xs font-bold text-gray-700">{product.rating}</span>
                   </div>
                )}
              </div>

              {/* Content Area */}
              <div className="flex flex-col flex-1 p-3 md:p-4">
                <div className="mb-2 md:mb-3">
                  <span className="block text-[10px] font-bold tracking-widest text-[#c9a24d] uppercase truncate">
                    {product.category || "Luxury"}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold leading-tight text-gray-900 truncate md:text-base group-hover:text-[#c9a24d] transition-colors">
                    {product.name}
                  </h3>
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                  <p className="text-base font-bold text-gray-900 md:text-lg">
                    ₹{Number(product.price || 0).toLocaleString()}
                  </p>

                  {/* Adaptive Action Button */}
                  <div className="h-9 md:h-10">
                    {quantity === 0 ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center justify-center w-full h-full gap-2 text-white transition-all bg-black rounded-lg shadow-sm hover:bg-gray-800 active:scale-95 hover:shadow-md"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span className="text-xs font-bold tracking-wide uppercase md:text-sm">Add to Cart</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between w-full h-full p-1 border border-gray-200 rounded-lg bg-gray-50">
                        <button 
                          onClick={() => handleDecrement(productId)}
                          className="flex items-center justify-center h-full text-gray-600 transition-colors bg-white rounded shadow-sm aspect-square hover:text-red-500 hover:bg-red-50"
                        >
                          <Minus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>

                        <span className="text-sm font-bold text-gray-900 md:text-base">{quantity}</span>

                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="flex items-center justify-center h-full text-white transition-colors shadow-sm aspect-square bg-[#c9a24d] rounded hover:bg-[#b08d3b]"
                        >
                          <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="py-24 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full animate-bounce">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default Productlayout;