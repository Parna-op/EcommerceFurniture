import heroImage1 from "../../assets/chairdetail.png";
import heroImage2 from "../../assets/curvedchair.png";
import heroImage3 from "../../assets/loungechair.png";
import { ArrowUpRight } from "lucide-react";

const FeaturedSection = () => {
  return (
    <section className="relative z-20 w-full mt-8 md:mt-0">
      
      {/* CONTAINER:
         - 'no-scrollbar': Class to hide the bar (see CSS below).
         - 'px-6': Padding so the first card isn't glued to the edge.
         - 'snap-x': Enables smooth snapping.
      */}
      <div className="flex gap-4 px-6 pb-4 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 lg:gap-8 no-scrollbar md:px-0">

        {/* --- CARD 1 --- */}
        {/* Mobile: w-[65vw] (Small, compact size) */}
        <div className="relative flex-none w-[65vw] md:w-auto md:col-span-1 snap-center">
          <div className="relative w-full h-[240px] lg:h-[320px] overflow-hidden transition-all duration-500 group rounded-xl shadow-sm hover:shadow-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            <img
              src={heroImage3}
              alt="Signature Lounge Chair"
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 w-full p-4 text-white">
              <span className="block mb-1 text-[9px] tracking-[0.2em] uppercase text-white/70 font-medium">
                Curated
              </span>
              <h3 className="mb-1 font-serif text-lg font-medium leading-tight">
                Signature Lounge
              </h3>
              <button className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest transition-colors text-white/70 hover:text-[#c9a24d]">
                Explore
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* --- CARD 2 --- */}
        <div className="relative flex-none w-[65vw] md:w-auto md:col-span-1 snap-center">
          <div className="relative w-full h-[240px] lg:h-[320px] overflow-hidden transition-all duration-500 group rounded-xl shadow-sm hover:shadow-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            <img
              src={heroImage2}
              alt="Refined Forms Chair"
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 w-full p-4 text-white">
              <h3 className="mb-1 font-serif text-lg font-medium">
                Refined Forms
              </h3>
              <p className="text-[10px] leading-relaxed text-white/70 line-clamp-2">
                An exercise in balance, proportion, and restraint.
              </p>
            </div>
          </div>
        </div>

        {/* --- CARD 3 --- */}
        <div className="relative flex-none w-[65vw] md:w-auto md:col-span-2 snap-center">
          <div className="relative w-full h-[240px] lg:h-[320px] overflow-hidden transition-all duration-500 group rounded-xl shadow-sm hover:shadow-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            <img
              src={heroImage1}
              alt="Closer Look"
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 w-full p-5 text-white">
              <h3 className="font-serif text-xl italic font-medium">
                A Closer Look
              </h3>
            </div>
          </div>
        </div>

        {/* Spacer for scroll end */}
        <div className="flex-none w-2 md:hidden"></div>

      </div>
    </section>
  );
};

export default FeaturedSection;