import React, { useState } from "react";
import { 
  PackagePlus, IndianRupee, Database, 
  Image as ImageIcon, Sparkles, 
  AlignLeft, Layers, Loader, X 
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

function NewProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null); 

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  // Handle Text Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Selection
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  // Handle Form Submission
  const handlesubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("stock", formData.stock);
      data.append("description", formData.description);
      if (file) {
        data.append("productImage", file); 
      }
      const res = await axios.post(`/product/Newproduct`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      console.log("Success:", res.data);

      if (res.status === 200 || res.status === 201) {
        alert("Product Created Successfully!");
        navigate("/admin/Newproduct"); 
      }
    } catch (error) {
      console.error("Error creating product:", error.response?.data || error.message);
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex justify-center p-4 sm:p-6 font-sans antialiased relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="fixed top-[-20%] right-[-10%] w-[70%] h-[70%] bg-amber-100/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-50/40 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-5xl pt-20 pb-12 sm:pt-24">
        <div className="mb-8 text-center duration-700 sm:mb-10 animate-in fade-in slide-in-from-bottom-4">
           <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-2">Inventory Control</p>
           <h2 className="text-3xl font-light sm:text-4xl text-stone-900">
               New <span className="font-serif italic text-amber-600/80">Asset</span>
           </h2>
        </div>

        <div className="relative rounded-4xl sm:rounded-[40px] bg-white/80 backdrop-blur-3xl p-6 sm:p-8 md:p-12 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.04)] border border-stone-100/80 ring-1 ring-white/50 animate-in zoom-in-95 duration-500">
          
          <form onSubmit={handlesubmit} className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
            
            {/* Name Input */}
            <div className="space-y-3 group">
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-sm"></span>
                Asset Name
              </label>
              <div className="relative transition-all duration-300 group-hover:-translate-y-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <PackagePlus size={18} className="transition-colors text-stone-300 group-hover:text-blue-500" />
                </div>
                <input
                  name="name"
                  required
                  onChange={handleChange}
                  placeholder="Ex: Royal Chronograph"
                  className="w-full pl-11 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm sm:text-base text-stone-800 placeholder:text-stone-400 outline-none transition-all duration-300 focus:bg-white focus:border-blue-300 focus:shadow-[0_4px_20px_-4px_rgba(37,99,235,0.1)] group-hover:border-blue-200"
                />
              </div>
            </div>

            {/* Price Input */}
            <div className="space-y-3 group">
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-sm"></span>
                Valuation (₹)
              </label>
              <div className="relative transition-all duration-300 group-hover:-translate-y-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <IndianRupee size={18} className="transition-colors text-stone-300 group-hover:text-emerald-500" />
                </div>
                <input
                  name="price"
                  type="number"
                  required
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full pl-11 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm sm:text-base text-stone-800 placeholder:text-stone-400 outline-none transition-all duration-300 focus:bg-white focus:border-emerald-300 focus:shadow-[0_4px_20px_-4px_rgba(16,185,129,0.1)] group-hover:border-emerald-200"
                />
              </div>
            </div>

            {/* Category Input */}
            <div className="space-y-3 group">
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-sm"></span>
                Classification
              </label>
              <div className="relative transition-all duration-300 group-hover:-translate-y-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Layers size={18} className="transition-colors text-stone-300 group-hover:text-amber-500" />
                </div>
                <input
                  name="category"
                  onChange={handleChange}
                  placeholder="Luxury Goods"
                  className="w-full pl-11 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm sm:text-base text-stone-800 placeholder:text-stone-400 outline-none transition-all duration-300 focus:bg-white focus:border-amber-300 focus:shadow-[0_4px_20px_-4px_rgba(217,119,6,0.1)] group-hover:border-amber-200"
                />
              </div>
            </div>

            {/* Stock Input */}
            <div className="space-y-3 group">
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full shadow-sm"></span>
                Availability
              </label>
              <div className="relative transition-all duration-300 group-hover:-translate-y-1">
                 <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Database size={18} className="transition-colors text-stone-300 group-hover:text-purple-500" />
                </div>
                <input
                  name="stock"
                  type="number"
                  onChange={handleChange}
                  placeholder="Units"
                  className="w-full pl-11 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm sm:text-base text-stone-800 placeholder:text-stone-400 outline-none transition-all duration-300 focus:bg-white focus:border-purple-300 focus:shadow-[0_4px_20px_-4px_rgba(147,51,234,0.1)] group-hover:border-purple-200"
                />
              </div>
            </div>

            {/* Description Input */}
            <div className="space-y-3 group md:col-span-2">
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1 flex items-center gap-2">
                 <AlignLeft size={14} className="text-stone-300" />
                 Narrative
              </label>
              <div className="relative transition-all duration-300 group-hover:-translate-y-1">
                <textarea
                   name="description"
                   rows="4"
                   onChange={handleChange}
                   placeholder="Detail the specifications..."
                   className="w-full bg-stone-50 border border-stone-200 rounded-3xl px-6 py-5 text-sm sm:text-base text-stone-800 placeholder:text-stone-400 outline-none transition-all duration-300 focus:bg-white focus:border-amber-300 focus:shadow-[0_4px_20px_-4px_rgba(217,119,6,0.1)] resize-none group-hover:border-stone-300"
                />
              </div>
            </div>

            {/* Image Upload Area */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">Visual Evidence</label>
              
              <label className="relative flex flex-col items-center justify-center w-full h-40 overflow-hidden transition-all duration-500 border-2 border-dashed cursor-pointer group sm:h-48 border-stone-200 rounded-4xl bg-stone-50/40 hover:bg-white hover:border-amber-300 hover:shadow-xl hover:shadow-amber-50/40">
                
                {imagePreview ? (
                  /* Preview if image selected */
                  <div className="relative w-full h-full">
                    <img src={imagePreview} alt="Preview" className="object-cover w-full h-full opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center transition-all bg-black/20 group-hover:bg-black/40">
                      <p className="text-sm font-medium text-white">Click to change</p>
                    </div>
                  </div>
                ) : (
                  /* Default Upload State */
                  <div className="flex flex-col items-center justify-center p-4 text-center">
                    <div className="p-3 mb-3 transition-transform duration-500 bg-white border rounded-full shadow-sm sm:p-4 sm:mb-4 border-stone-100 group-hover:scale-110">
                       <ImageIcon size={24} className="transition-colors text-stone-300 group-hover:text-amber-500" />
                    </div>
                    <p className="text-xs font-bold tracking-wide transition-colors text-stone-500 group-hover:text-amber-700">
                      Click to Upload Master Asset
                    </p>
                  </div>
                )}
                
                {/* Actual File Input */}
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col items-center justify-center pt-8 md:col-span-2">
              <button 
                type="submit"
                disabled={loading}
                className="relative flex items-center justify-center w-full gap-4 px-8 py-4 overflow-hidden transition-all duration-500 rounded-full shadow-2xl group md:w-auto md:px-16 md:py-5 bg-stone-900 hover:shadow-amber-500/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                 <span className="relative z-10 text-xs font-bold text-white uppercase tracking-[0.25em] group-hover:text-amber-200 transition-colors">
                    {loading ? "Minting..." : "Mint Asset"}
                 </span>
                 
                 {/* Button Hover Effects */}
                 <div className="absolute inset-0 bg-linear-to-r from-stone-800 to-stone-900" />
                 <div className="absolute inset-0 transition-transform duration-1000 ease-in-out -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full" />
                 
                 <div className="relative z-10 p-1 transition-all duration-500 border rounded-full bg-white/10 border-white/10 group-hover:bg-amber-500 group-hover:border-amber-400 group-hover:rotate-12">
                   {loading ? <Loader size={14} className="text-white animate-spin"/> : <Sparkles size={14} className="text-stone-400 group-hover:text-white" strokeWidth={3} />}
                 </div>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;