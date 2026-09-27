import { useState } from "react";
import { motion } from "framer-motion";

const categories = ["Living", "Bedroom", "Workspace"];

const CategoryChips = () => {
  const [active, setActive] = useState("Living");

  return (
    <div className="flex items-center gap-2 mb-10">
      {categories.map((cat) => {
        const isActive = active === cat;
        
        return (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`
              relative px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-colors duration-300
              ${isActive ? "text-[#c9a24d]" : "text-white/60 hover:text-white"}
            `}
          >
            {/* The Text (z-index 10 to sit on top) */}
            <span className="relative z-10">{cat}</span>

            {/* The Background Pill (Only renders if active) */}
            {isActive && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 rounded-full bg-white/10 border border-[#c9a24d]/20"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryChips;

// className="text-lg max-w-md mb-10 text-[hsl(40_15%_60%)]
