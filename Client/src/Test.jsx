// import React, { useState } from 'react';
// import { 
//   Search, 
//   Filter, 
//   MoreVertical, 
//   Trash2, 
//   Edit, 
//   Shield, 
//   User, 
//   CheckCircle, 
//   XCircle,
//   Mail,
//   Download
// } from 'lucide-react';

// const AdminUsers = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   // Mock User Data
//   const users = [
//     {
//       id: 1,
//       name: 'Alex Morgan',
//       email: 'alex.morgan@example.com',
//       role: 'Customer',
//       status: 'Active',
//       joinDate: 'Feb 01, 2026',
//       avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     {
//       id: 2,
//       name: 'Sarah Jones',
//       email: 'sarah.j@design.co',
//       role: 'Admin',
//       status: 'Active',
//       joinDate: 'Jan 15, 2026',
//       avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     {
//       id: 3,
//       name: 'Michael Chen',
//       email: 'mike.chen@tech.io',
//       role: 'Customer',
//       status: 'Banned',
//       joinDate: 'Dec 10, 2025',
//       avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     {
//       id: 4,
//       name: 'Emma Wilson',
//       email: 'emma.w@gmail.com',
//       role: 'Customer',
//       status: 'Active',
//       joinDate: 'Feb 05, 2026',
//       avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     {
//       id: 5,
//       name: 'James Carter',
//       email: 'james@carter.com',
//       role: 'Customer',
//       status: 'Inactive',
//       joinDate: 'Nov 20, 2025',
//       avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//   ];

//   // Helper for Status Colors
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Active': return 'bg-green-50 text-green-700 ring-green-600/20';
//       case 'Inactive': return 'bg-gray-50 text-gray-600 ring-gray-500/10';
//       case 'Banned': return 'bg-red-50 text-red-700 ring-red-600/10';
//       default: return 'bg-gray-50 text-gray-600 ring-gray-500/10';
//     }
//   };

//   // Helper for Role Icons
//   const getRoleIcon = (role) => {
//     return role === 'Admin' ? <Shield className="w-3 h-3 text-purple-600" /> : <User className="w-3 h-3 text-gray-500" />;
//   };

//   return (
//     <div className="min-h-screen p-6 pt-24 bg-gray-50/50 md:p-8">
//       <div className="mx-auto space-y-6 max-w-7xl">
        
//         {/* Header Section */}
//         <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
//             <p className="mt-1 text-sm text-gray-500">Manage user access and details.</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
//               <Download className="w-4 h-4" />
//               Export CSV
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-lg shadow-sm hover:bg-gray-800">
//               <User className="w-4 h-4" />
//               Add User
//             </button>
//           </div>
//         </div>

//         {/* Stats Row (Optional) */}
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//            <div className="flex items-center justify-between p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
//              <div>
//                 <p className="text-sm text-gray-500">Total Users</p>
//                 <h3 className="text-2xl font-bold text-gray-900">1,284</h3>
//              </div>
//              <div className="p-2 rounded-lg bg-blue-50">
//                 <User className="w-5 h-5 text-blue-600" />
//              </div>
//            </div>
//            {/* You can add 'Active Users' or 'New Signups' cards here */}
//         </div>

//         {/* Main Table Card */}
//         <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          
//           {/* Table Toolbar */}
//           <div className="flex flex-col items-center justify-between gap-4 p-4 border-b border-gray-200 sm:flex-row">
//             {/* Search */}
//             <div className="relative w-full sm:max-w-xs">
//               <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
//               <input 
//                 type="text" 
//                 placeholder="Search by name or email..." 
//                 className="w-full py-2 pl-10 pr-4 text-sm transition-all border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             {/* Filter Button */}
//             <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
//                <Filter className="w-4 h-4" />
//                Filters
//             </button>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="text-xs font-medium tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50/50">
//                   <th className="px-6 py-4">User</th>
//                   <th className="px-6 py-4">Role</th>
//                   <th className="px-6 py-4">Status</th>
//                   <th className="px-6 py-4">Join Date</th>
//                   <th className="px-6 py-4 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {users.map((user) => (
//                   <tr key={user.id} className="transition-colors hover:bg-gray-50/50 group">
                    
//                     {/* User Info Column */}
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <img 
//                           src={user.avatar} 
//                           alt={user.name} 
//                           className="object-cover border border-gray-200 rounded-full w-9 h-9"
//                         />
//                         <div className="flex flex-col">
//                           <span className="text-sm font-medium text-gray-900">{user.name}</span>
//                           <span className="text-xs text-gray-500">{user.email}</span>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Role Column */}
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-1.5">
//                         {getRoleIcon(user.role)}
//                         <span className="text-sm text-gray-700">{user.role}</span>
//                       </div>
//                     </td>

//                     {/* Status Column */}
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ring-1 ring-inset ${getStatusColor(user.status)}`}>
//                         {user.status}
//                       </span>
//                     </td>

//                     {/* Date Column */}
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {user.joinDate}
//                     </td>

//                     {/* Actions Column */}
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end gap-2 transition-opacity opacity-0 group-hover:opacity-100">
//                         <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
//                           <Edit className="w-4 h-4" />
//                         </button>
//                         <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                         <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
//                           <MoreVertical className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Footer / Pagination */}
//           <div className="flex items-center justify-between p-4 text-sm text-gray-500 border-t border-gray-200">
//              <span>Showing 1-5 of 1,284 users</span>
//              <div className="flex gap-2">
//                 <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">Previous</button>
//                 <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Next</button>
//              </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminUsers;



import React, { useState } from "react";
import { 
  Filter, 
  ChevronDown, 
  Search, 
  X, 
  ShoppingCart,
  Heart,
  Star
} from "lucide-react";

// --- Mock Data ---
const PRODUCTS = [
  { id: 1, name: "Obsidian Chronograph", price: 1250, category: "Watches", rating: 4.8, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1000" },
  { id: 2, name: "Velvet Evening Clutch", price: 450, category: "Bags", rating: 4.5, image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=1000" },
  { id: 3, name: "Royal Gold Cufflinks", price: 295, category: "Accessories", rating: 4.9, image: "https://images.unsplash.com/photo-1596901300940-02542a343d6a?auto=format&fit=crop&q=80&w=1000" },
  { id: 4, name: "Midnight Silk Scarf", price: 180, category: "Accessories", rating: 4.6, image: "https://images.unsplash.com/photo-1601924994987-69e2c70cb377?auto=format&fit=crop&q=80&w=1000" },
  { id: 5, name: "Noir Leather Tote", price: 890, category: "Bags", rating: 4.7, image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000" },
  { id: 6, name: "Diamond Tennis Bracelet", price: 3500, category: "Jewelry", rating: 5.0, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1000" },
];

const CATEGORIES = ["All", "Watches", "Bags", "Accessories", "Jewelry"];
const SORT_OPTIONS = [
  { label: "Newest Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

const Shop = () => {
  // State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("newest");

  // Filter Logic (Simple Client-Side)
  const filteredProducts = PRODUCTS.filter(product => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  }).sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    return 0; // Default (mock newest)
  });

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans text-[#1a1a1a]">
      
      {/* Header Banner */}
      <div className="bg-[#1a1a1a] text-white py-12 px-6 sm:px-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-white/5 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #C9A24D 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <h1 className="relative z-10 mb-2 font-serif text-3xl tracking-widest sm:text-4xl">THE COLLECTION</h1>
        <p className="relative z-10 text-sm tracking-widest uppercase text-white/60">Curated Luxury Essentials</p>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* === SIDEBAR FILTER (Desktop) === */}
        <aside className="hidden w-64 space-y-10 lg:block shrink-0">
          
          {/* Categories */}
          <div>
            <h3 className="font-serif text-lg mb-6 border-b border-[#1a1a1a]/10 pb-2">Categories</h3>
            <ul className="space-y-3">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button 
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm uppercase tracking-wider transition-colors duration-300 w-full text-left
                      ${selectedCategory === cat ? "text-[#C9A24D] font-bold" : "text-gray-500 hover:text-[#1a1a1a]"}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-serif text-lg mb-6 border-b border-[#1a1a1a]/10 pb-2">Price Range</h3>
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
              <span>${priceRange[0]}</span>
              <div className="flex-1 h-[1px] bg-gray-300"></div>
              <span>${priceRange[1]}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="5000" 
              step="50"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C9A24D]"
            />
          </div>

          {/* Featured (Static for demo) */}
          <div className="p-6 bg-[#1a1a1a] text-white text-center rounded-sm">
            <p className="mb-2 font-serif text-xl">New Season</p>
            <p className="mb-4 text-xs text-white/60">Exclusive access to our latest arrivals.</p>
            <button className="text-xs border-b border-[#C9A24D] text-[#C9A24D] pb-1 hover:text-white hover:border-white transition-colors">
              VIEW LOOKBOOK
            </button>
          </div>
        </aside>


        {/* === MAIN CONTENT === */}
        <div className="flex-1">
          
          {/* Toolbar (Mobile Filter Toggle + Sort) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-[#1a1a1a]/5 gap-4">
            
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-[#1a1a1a]">{filteredProducts.length}</span> results
            </p>

            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm uppercase tracking-widest hover:text-[#C9A24D]"
              >
                <Filter size={16} /> Filters
              </button>

              {/* Sort Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-[#C9A24D]">
                  Sort By <ChevronDown size={14} />
                </button>
                {/* Dropdown Menu */}
                <div className="absolute right-0 z-20 invisible w-48 mt-2 transition-all duration-300 bg-white border border-gray-100 shadow-xl opacity-0 top-full group-hover:opacity-100 group-hover:visible">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={`block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors
                        ${sortBy === opt.value ? "text-[#C9A24D]" : "text-gray-600"}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>


          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.map((product) => (
              <div key={product.id} className="cursor-pointer group">
                {/* Image Container */}
                <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute bottom-0 left-0 flex w-full gap-2 p-4 transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                    <button className="flex-1 bg-[#1a1a1a] text-white py-3 text-xs uppercase tracking-widest hover:bg-[#C9A24D] transition-colors">
                      Add to Cart
                    </button>
                    <button className="bg-white p-3 text-[#1a1a1a] hover:text-[#C9A24D] transition-colors">
                      <Heart size={16} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <p className="mb-1 text-xs tracking-widest text-gray-400 uppercase">{product.category}</p>
                  <h3 className="font-serif text-lg text-[#1a1a1a] mb-2 group-hover:text-[#C9A24D] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-medium">${product.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
             <div className="py-20 text-center text-gray-400">
                <p>No products found matching your criteria.</p>
                <button 
                  onClick={() => { setSelectedCategory("All"); setPriceRange([0,5000]); }}
                  className="mt-4 text-[#C9A24D] underline"
                >
                  Clear Filters
                </button>
             </div>
          )}

        </div>
      </div>


      {/* === MOBILE FILTER DRAWER === */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          
          {/* Drawer */}
          <div className="relative w-[300px] h-full bg-white p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-xl">Filters</h2>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <X size={24} className="text-gray-400 hover:text-black" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="mb-8">
              <h3 className="mb-4 text-sm font-bold tracking-widest uppercase">Category</h3>
              <ul className="space-y-3">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <label className="flex items-center gap-3 text-gray-600">
                      <input 
                        type="radio" 
                        name="mobileCategory"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="accent-[#C9A24D] w-4 h-4" 
                      />
                      {cat}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Price */}
            <div className="mb-8">
              <h3 className="mb-4 text-sm font-bold tracking-widest uppercase">Price Range</h3>
              <input 
                type="range" 
                min="0" 
                max="5000" 
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none accent-[#C9A24D]"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>$0</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <button 
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full bg-[#1a1a1a] text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#C9A24D] transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Shop;