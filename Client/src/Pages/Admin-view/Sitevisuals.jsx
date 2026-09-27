import React, { useState } from "react";
import { 
  Image as ImageIcon, UploadCloud, Save, 
  LayoutTemplate, Info, Type, MousePointerClick, 
  ArrowUpRight 
} from "lucide-react";

const SiteSettings = () => {
  const [activeTab, setActiveTab] = useState("hero");
  
  const [content, setContent] = useState({
    hero: {
      heading: "FURNITURE DESIGNED FOR MODERN LIVING",
      subheading: "Crafted with precision, designed for comfort, and built to elevate everyday spaces.",
      buttonText: "Shop Collection",

      mainImage: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2500&auto=format&fit=crop",
      subImages: [
        { url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop", title: "Signature Lounge Chair" },
        { url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop", title: "Refined Forms" },
        { url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop", title: "A Closer Look" }
      ]
    },
    about: {
      heading: "Curated Elegance",
      subheading: "Refined forms, balanced proportions, and absolute restraint.",
      buttonText: "Read Our Story",
      mainImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop",
      subImages: [] 
    }
  });

  const handleMainImageChange = (e, section) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setContent(prev => ({
        ...prev,
        [section]: { ...prev[section], mainImage: objectUrl }
      }));
    }
  };

  const handleSubImageChange = (e, section, index) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setContent(prev => {
        const newSubImages = [...prev[section].subImages];
        newSubImages[index] = { ...newSubImages[index], url: objectUrl };
        return {
          ...prev,
          [section]: { ...prev[section], subImages: newSubImages }
        };
      });
    }
  };

  const handleTextChange = (e, section, field) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: e.target.value }
    }));
  };

  const activeConfig = content[activeTab];

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex justify-center p-6 font-sans antialiased relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed top-[-20%] right-[-10%] w-[70%] h-[70%] bg-amber-100/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-50/40 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full pt-24 pb-12 max-w-7xl">
        
        {/* Header */}
        <div className="mb-10 text-center duration-700 animate-in fade-in slide-in-from-bottom-4">
           <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-2">CMS Control</p>
           <h2 className="text-4xl font-light text-stone-900">
               Site <span className="font-serif italic text-amber-600/80">Visuals</span>
           </h2>
        </div>

        {/* Main Card */}
        <div className="relative rounded-[40px] bg-white/80 backdrop-blur-3xl p-8 md:p-12 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.04)] border border-stone-100/80 ring-1 ring-white/50 animate-in zoom-in-95 duration-500">
          
          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 rounded-full bg-stone-100/60 border border-stone-200/50 relative shadow-inner">
                {['hero', 'about'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative flex items-center gap-2 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 z-10 ${
                            activeTab === tab ? "text-stone-900" : "text-stone-400 hover:text-stone-600"
                        }`}
                    >
                        {activeTab === tab && (
                            <div className="absolute inset-0 bg-white rounded-full shadow-[0_2px_10px_-2px_rgba(0,0,0,0.08)] border border-stone-100 -z-10 animate-in zoom-in-95 duration-200" />
                        )}
                        {tab === 'hero' ? <LayoutTemplate size={14}/> : <Info size={14}/>}
                        {tab} Section
                    </button>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 xl:grid-cols-2">
            
            {/* LEFT COLUMN: Configuration Inputs */}
            <div className="order-2 space-y-8 xl:order-1">
                
                {/* 1. Text Fields */}
                <div className="p-6 space-y-4 border bg-stone-50/50 rounded-3xl border-stone-100">
                    <div className="space-y-2 group">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1 flex items-center gap-2">
                            <Type size={12} /> Main Heading
                        </label>
                        <textarea
                            rows={2}
                            value={activeConfig.heading}
                            onChange={(e) => handleTextChange(e, activeTab, 'heading')}
                            className="w-full px-4 py-3 font-serif text-lg transition-all bg-white border outline-none resize-none border-stone-200 rounded-xl text-stone-900 focus:border-amber-300"
                        />
                    </div>
                    <div className="space-y-2 group">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1 flex items-center gap-2">
                            <Type size={12} /> Sub-Text
                        </label>
                        <textarea
                            rows={2}
                            value={activeConfig.subheading}
                            onChange={(e) => handleTextChange(e, activeTab, 'subheading')}
                            className="w-full px-4 py-3 text-sm transition-all bg-white border outline-none resize-none border-stone-200 rounded-xl text-stone-600 focus:border-amber-300"
                        />
                    </div>
                    <div className="space-y-2 group">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1 flex items-center gap-2">
                            <MousePointerClick size={12} /> Button Label
                        </label>
                        <input
                            value={activeConfig.buttonText}
                            onChange={(e) => handleTextChange(e, activeTab, 'buttonText')}
                            className="w-full px-4 py-3 text-sm transition-all bg-white border outline-none border-stone-200 rounded-xl text-stone-600 focus:border-amber-300"
                        />
                    </div>
                </div>

                {/* 2. Main Background Uploader */}
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">
                        Main Hero Section Image
                    </label>
                    <label className="relative flex flex-col items-center justify-center w-full overflow-hidden transition-all duration-500 border-2 border-dashed cursor-pointer group h-36 border-stone-200 rounded-3xl bg-stone-50/40 hover:bg-white hover:border-amber-300 hover:shadow-lg">
                        {/* Image Preview */}
                        <img src={activeConfig.mainImage} alt="Main" className="absolute inset-0 object-cover w-full h-full opacity-60 group-hover:opacity-40 blur-[2px] transition-all" />
                        
                        <div className="relative z-10 flex flex-col items-center justify-center">
                            <div className="p-2.5 mb-2 rounded-full bg-white shadow-sm border border-stone-100 group-hover:scale-110 transition-transform duration-500">
                                <ImageIcon size={18} className="transition-colors text-stone-300 group-hover:text-amber-500" />
                            </div>
                            <p className="text-[10px] font-bold text-stone-900 bg-white/50 px-2 py-1 rounded backdrop-blur-sm group-hover:text-amber-700 uppercase tracking-widest">
                                Change Main Image
                            </p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleMainImageChange(e, activeTab)} />
                    </label>
                </div>

                {/* 3. Sub-Images Uploader Grid */}
                {activeTab === 'hero' && (
                    <div className="pt-4 space-y-4 border-t border-stone-100">
                        <div className="grid grid-cols-3 gap-4">
                            {activeConfig.subImages.map((img, index) => (
                                <div key={index} className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold ml-1 block truncate">
                                        Hero Section Image {index + 1}
                                    </label>
                                    
                                    <label className="relative flex flex-col items-center justify-center w-full overflow-hidden transition-all border-2 border-dashed cursor-pointer group aspect-square border-stone-200 rounded-2xl bg-stone-50/40 hover:bg-white hover:border-amber-300 hover:shadow-md">
                                        <img 
                                            src={img.url} 
                                            alt={`Hero Image ${index + 1}`} 
                                            className="object-cover w-full h-full transition-opacity opacity-80 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/30 group-hover:opacity-100">
                                            <UploadCloud size={20} className="text-white drop-shadow-md" />
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleSubImageChange(e, activeTab, index)} />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT COLUMN: Live Preview */}
            <div className="relative order-1 xl:order-2">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1 mb-3 block">
                    Live Preview ({activeTab})
                </label>
                
                {/* Simulated Website Viewport */}
                <div className="relative w-full overflow-hidden bg-black border shadow-2xl aspect-16/10 rounded-4xl border-stone-200 group ring-4 ring-stone-50">
                    
                    {/* Main Background */}
                    <img 
                        src={activeConfig.mainImage} 
                        alt="Main Preview" 
                        className="object-cover w-full h-full transition-transform duration-1000 opacity-80 group-hover:scale-105"
                    />
                    
                    {/* Overlay Gradient (Top down dark) */}
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black/90" />
                    
                    {/* Navigation Bar Simulation */}
                    <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6">
                        <span className="font-serif text-lg tracking-widest text-white">LUXORA</span>
                        <div className="hidden sm:flex gap-6 text-[9px] text-white/80 uppercase tracking-widest font-medium">
                            <span>Home</span><span>Products</span><span>Contact Us</span>
                        </div>
                        <div className="flex gap-3 text-white/80">
                             <div className="w-4 h-4 border rounded-full border-white/30"></div>
                             <div className="w-4 h-4 border rounded-full border-white/30"></div>
                        </div>
                    </div>

                    {/* HERO CONTENT CONTAINER */}
                    <div className="absolute inset-0 flex flex-col justify-center px-8 pb-20 sm:px-12">
                         {/* Main Text Area */}
                         <div className="max-w-lg mb-8 space-y-5">
                             <h3 className="font-serif text-3xl leading-tight tracking-wide text-white sm:text-5xl drop-shadow-lg">
                                {activeConfig.heading}
                             </h3>
                             <p className="max-w-md text-xs font-light leading-relaxed sm:text-sm text-white/80">
                                {activeConfig.subheading}
                             </p>
                             <div className="pt-4">
                                <button className="px-8 py-3 bg-[#ffcc99] text-stone-900 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full shadow-lg hover:bg-white transition-colors">
                                    {activeConfig.buttonText}
                                </button>
                             </div>
                         </div>
                    </div>

                    {/* THE 3 BOTTOM CARDS (Overlaying bottom) */}
                    {activeTab === 'hero' && activeConfig.subImages.length > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 flex items-end h-40 gap-4 px-8 pb-8">
                            {activeConfig.subImages.map((item, i) => (
                                <div key={i} className="relative flex-1 h-full overflow-hidden border shadow-2xl rounded-2xl bg-stone-800 border-white/10 group/card">
                                    <img 
                                        src={item.url} 
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover/card:scale-110" 
                                        alt="card" 
                                    />
                                    {/* Card Overlay & Text */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-4 bg-linear-to-t from-black/80 via-black/20 to-transparent">
                                        <p className="text-[8px] text-[#ffcc99] uppercase tracking-widest font-bold mb-1">
                                            {i === 0 ? "Curated" : i === 1 ? "Design" : "Detail"}
                                        </p>
                                        <h4 className="mb-2 font-serif text-sm leading-tight text-white">
                                            {item.title}
                                        </h4>
                                        {i === 0 && (
                                            <div className="flex items-center gap-1 text-[8px] text-white/70 uppercase tracking-wider">
                                                Explore <ArrowUpRight size={8} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Admin Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] font-bold text-white uppercase tracking-widest">
                        Preview Mode
                    </div>
                </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="flex justify-end pt-8 mt-12 border-t border-stone-100">
              <button className="relative flex items-center gap-4 px-12 py-4 transition-all duration-500 rounded-full shadow-xl group bg-stone-900 hover:shadow-amber-500/20 active:scale-95">
                <span className="relative z-10 text-xs font-bold text-white uppercase tracking-[0.25em] group-hover:text-amber-200 transition-colors">Publish Updates</span>
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-stone-800 to-stone-900" />
                <div className="absolute inset-0 transition-transform duration-1000 ease-in-out -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full" />
                <div className="relative z-10 p-1 transition-colors rounded-full bg-white/10 group-hover:bg-amber-500">
                    <Save size={14} className="text-white" />
                </div>
              </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SiteSettings;