/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
       screens: {
      // 1. Tiny Phones (Default / no prefix)
        // Targets: iPhone SE, Galaxy S23, Pixel (Portrait)
        // Range: 0px to 474px

        // 2. Large Phones / Landscape
        'xs': '300px',
        // Targets: iPhone Pro Max, Large Androids, Mobile Landscape
        
        // 3. Tablets (Portrait)
        'sm': '640px',
        // Targets: iPad Mini, Galaxy Tab A (Portrait)
        
        // 4. Tablets (Landscape) / Small Laptops
        'md': '768px',
        // Targets: iPad Pro, iPad Air, Surface Pro (Portrait)
        // Note: The iPad width is exactly 768px.
        
        // 5. Laptops / Desktops
        'lg': '1024px',
        // Targets: MacBook Air, iPad Pro (Landscape), Small Windows Laptops
        
        // 6. High-Res Laptops / Monitors
        'xl': '1280px',
        // Targets: MacBook Pro, Standard 1080p Desktop Monitors
        
        // 7. Large Screens
        '2xl': '1536px',
        // Targets: 24"+ Monitors,
    },
  },
  plugins: [],
}


// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//          colors: {
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         muted: {
//           foreground: "hsl(var(--muted-foreground))",
//         },
//     },
//   },
// },
//   plugins: [],
// };

