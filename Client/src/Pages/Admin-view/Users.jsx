import React, { useState, useMemo } from "react";
import { 
  Shield, Crown, UserPlus, 
  User, ArrowUpRight, X, 
  Mail, Calendar, Activity, CheckCircle, Lock 
} from "lucide-react";

// --- MOCK DATA ---
const usersData = [
  { id: 1, name: "Rajat Sharma", email: "rajat@email.com", role: "user", status: "Active", joined: "Oct 2023", location: "New Delhi, IN" },
  { id: 2, name: "Aman Verma", email: "aman@email.com", role: "admin", status: "Active", joined: "Jan 2023", location: "Mumbai, IN" },
  { id: 3, name: "System Root", email: "root@system.com", role: "superuser", status: "Away", joined: "System Init", location: "Server 01" },
  { id: 4, name: "Sarah Jenkins", email: "sarah@email.com", role: "user", status: "Inactive", joined: "Mar 2024", location: "London, UK" },
  { id: 5, name: "Dev Patel", email: "dev@email.com", role: "superuser", status: "Active", joined: "Dec 2022", location: "Bangalore, IN" },
  { id: 6, name: "Priya Singh", email: "priya@email.com", role: "admin", status: "Active", joined: "Feb 2024", location: "Pune, IN" },
];

// --- ROYAL CONFIGURATION ---
const roleConfig = {
  user: { 
    label: "Standard Member", 
    icon: User, 
    accent: "bg-blue-50 text-blue-700",
    border: "group-hover:border-blue-200",
    shadow: "group-hover:shadow-[0_8px_30px_-6px_rgba(59,130,246,0.15)]",
    dot: "bg-blue-500",
    modalAccent: "from-blue-500 to-blue-600"
  },
  admin: { 
    label: "Administrator", 
    icon: Shield, 
    accent: "bg-emerald-50 text-emerald-700",
    border: "group-hover:border-emerald-200",
    shadow: "group-hover:shadow-[0_8px_30px_-6px_rgba(16,185,129,0.15)]",
    dot: "bg-emerald-500",
    modalAccent: "from-emerald-500 to-emerald-600"
  },
  superuser: { 
    label: "Royal Guard", 
    icon: Crown, 
    accent: "bg-amber-50 text-amber-700",
    border: "group-hover:border-amber-200",
    shadow: "group-hover:shadow-[0_8px_30px_-6px_rgba(245,158,11,0.15)]",
    dot: "bg-amber-500",
    modalAccent: "from-amber-500 to-amber-600"
  },
};

// --- SUB-COMPONENT: USER DETAIL MODAL ---
const UserDetailModal = ({ user, onClose }) => {
  if (!user) return null;
  const config = roleConfig[user.role];
  const RoleIcon = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 duration-300 bg-stone-900/20 backdrop-blur-sm animate-in fade-in">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white shadow-2xl rounded-[40px] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 border border-white/50 ring-1 ring-stone-100">
        
        {/* Header Background */}
        <div className={`h-32 bg-linear-to-r ${config.modalAccent} opacity-10 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-64 h-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-3xl" />
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute z-10 p-2 transition-all border rounded-full shadow-sm top-6 right-6 bg-white/50 hover:bg-white text-stone-500 hover:text-stone-900 border-white/50 backdrop-blur-md"
        >
          <X size={20} />
        </button>

        {/* Modal Content */}
        <div className="relative px-8 pb-8 -mt-16">
            
            {/* Identity Badge */}
            <div className="flex items-end justify-between mb-8">
                <div className="flex items-end gap-6">
                    <div className="w-32 h-32 p-2 bg-white border shadow-xl rounded-4xl border-stone-100">
                        <div className={`w-full h-full rounded-3xl ${config.accent} flex items-center justify-center`}>
                            <RoleIcon size={48} strokeWidth={1.5} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <h2 className="text-3xl font-light tracking-tight text-stone-900">{user.name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                            <p className="text-sm font-bold tracking-widest uppercase text-stone-400">{config.label}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
                
                {/* Info Column */}
                <div className="space-y-6">
                    <div className="p-5 space-y-4 border rounded-3xl bg-stone-50/50 border-stone-100">
                        <div className="flex items-center gap-3 text-stone-600">
                            <div className="p-2 bg-white rounded-full shadow-sm text-stone-400"><Mail size={16}/></div>
                            <span className="text-sm font-medium">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-stone-600">
                            <div className="p-2 bg-white rounded-full shadow-sm text-stone-400"><Calendar size={16}/></div>
                            <span className="text-sm font-medium">Joined {user.joined}</span>
                        </div>
                        <div className="flex items-center gap-3 text-stone-600">
                            <div className="p-2 bg-white rounded-full shadow-sm text-stone-400"><Activity size={16}/></div>
                            <span className="text-sm font-medium">{user.status} Status</span>
                        </div>
                    </div>
                </div>

                {/* Permissions Column */}
                <div className="space-y-4">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-2">Current Permissions</p>
                    <div className="flex flex-col gap-2">
                        {['Access Dashboard', 'View Analytics', 'Edit Profile'].map((perm, i) => (
                            <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white border shadow-sm rounded-2xl border-stone-100">
                                <CheckCircle size={16} className="text-emerald-500" />
                                <span className="text-xs font-bold tracking-wide uppercase text-stone-600">{perm}</span>
                            </div>
                        ))}
                        {user.role === 'superuser' && (
                            <div className="flex items-center gap-3 px-4 py-3 border rounded-2xl border-amber-100 bg-amber-50/30">
                                <Lock size={16} className="text-amber-500" />
                                <span className="text-xs font-bold tracking-wide uppercase text-amber-700">Root Access</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Action */}
            <div className="flex justify-end pt-6 border-t border-stone-100">
                <button 
                    onClick={onClose}
                    className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase transition-colors rounded-full shadow-lg bg-stone-900 hover:bg-stone-800 shadow-stone-200"
                >
                    Close Profile
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};


const RoyalDashboard = () => {
  const [users] = useState(usersData);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user for modal

  const filteredUsers = useMemo(() => {
    if (activeFilter === "all") return users;
    return users.filter((user) => user.role === activeFilter);
  }, [users, activeFilter]);

  const filters = [
    { id: "all", label: "View All" },
    { id: "user", label: "Users" },
    { id: "admin", label: "Admins" },
    { id: "superuser", label: "Superusers" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans antialiased relative">
      
      {/* Background Ambience */}
      <div className="fixed top-[-20%] right-[-10%] w-[70%] h-[70%] bg-amber-100/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-50/40 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* --- MODAL RENDERING --- */}
      {selectedUser && (
        <UserDetailModal 
            user={selectedUser} 
            onClose={() => setSelectedUser(null)} 
        />
      )}

      {/* Main Layout */}
      <main className="relative z-10 px-4 pt-12 pb-20 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        
        {/* --- PAGE HEADER & TOOLBAR --- */}
        <div className="flex flex-col justify-between gap-8 mb-12 duration-700 lg:flex-row lg:items-end animate-in fade-in slide-in-from-bottom-4">
           
           {/* Title Section */}
           <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-2">Overview</p>
              <h2 className="text-4xl font-light text-stone-900">
                  Access <span className="font-serif italic text-amber-600/80">Control</span>
              </h2>
           </div>

           {/* Toolbar: Filters + Actions */}
           <div className="flex flex-col sm:flex-row gap-4 sm:items-center bg-white/60 backdrop-blur-md p-2 rounded-[20px] border border-stone-100 shadow-sm">
              <div className="relative flex p-1 bg-stone-100/80 rounded-2xl">
                  {filters.map((tab) => {
                      const isActive = activeFilter === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveFilter(tab.id)}
                          className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 z-10 ${
                            isActive ? "text-stone-900" : "text-stone-400 hover:text-stone-600"
                          }`}
                        >
                          {isActive && (
                            <div className="absolute inset-0 duration-200 bg-white border shadow-sm rounded-xl border-stone-100 -z-10 animate-in zoom-in-95" />
                          )}
                          {tab.label}
                        </button>
                      );
                  })}
              </div>

              <div className="hidden w-px h-8 bg-stone-200 sm:block"></div>

              <div className="flex items-center gap-2 pr-2">
                 <button className="flex items-center justify-center w-10 h-10 transition-colors bg-white border rounded-xl border-stone-200 text-stone-400 hover:text-amber-600 hover:border-amber-200">
                    <UserPlus size={18} />
                 </button>
                 <button className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-lg shadow-stone-200">
                    <Crown size={14} className="text-amber-400" />
                    <span>New Guard</span>
                 </button>
              </div>
           </div>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => {
            const config = roleConfig[user.role];
            const RoleIcon = config.icon;

            return (
              <div 
                key={user.id} 
                onClick={() => setSelectedUser(user)} 
                className={`group cursor-pointer relative flex flex-col justify-between h-full bg-white p-8 rounded-4xl 
                  border border-stone-100 transition-all duration-500 ease-out animate-in zoom-in-95
                  ${config.border} ${config.shadow} hover:-translate-y-2
                `}
              >
                  {/* Glass Sheen */}
                  <div className="absolute inset-0 border pointer-events-none rounded-4xl border-white/50 mix-blend-overlay" />

                  <div className="flex items-start justify-between mb-8">
                      <div className={`p-3.5 rounded-2xl ${config.accent} ring-1 ring-inset ring-black/5 transition-transform duration-500 group-hover:scale-105`}>
                          <RoleIcon size={20} strokeWidth={1.5} />
                      </div>
                      <div className={`px-2.5 py-1 rounded-full border border-stone-100 bg-stone-50/50 flex items-center gap-1.5`}>
                          <div className={`w-1 h-1 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-stone-400'}`} />
                          <span className={`text-[10px] font-medium ${user.status === 'Active' ? 'text-stone-600' : 'text-stone-400'}`}>
                              {user.status}
                          </span>
                      </div>
                  </div>

                  <div className="mb-6">
                      <h3 className="text-lg font-medium tracking-tight transition-colors duration-300 text-stone-900 group-hover:text-amber-700">
                          {user.name}
                      </h3>
                      <p className="mt-1 text-sm font-light text-stone-400">{user.email}</p>
                  </div>

                  <div className="flex items-center justify-between pt-6 mt-auto border-t border-stone-50">
                      <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                            <span className="text-[10px] uppercase tracking-widest font-bold text-stone-500">
                              {config.label}
                            </span>
                      </div>
                      <button className="transition-opacity duration-300 opacity-0 group-hover:opacity-100 text-stone-300 hover:text-amber-600">
                          <ArrowUpRight size={18} />
                      </button>
                  </div>
              </div>
            );
          })}
          
          {/* Add Identity Ghost Card */}
          <button className="group relative flex flex-col items-center justify-center min-h-[250px] rounded-4xl border-2 border-dashed border-stone-200 bg-stone-50/30 hover:bg-white hover:border-amber-200 hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-500 cursor-pointer">
              <div className="p-4 mb-3 transition-transform duration-500 bg-white border rounded-full shadow-sm border-stone-100 group-hover:scale-110 text-stone-300 group-hover:text-amber-500">
                  <UserPlus size={20} strokeWidth={1.5} />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold group-hover:text-amber-700 transition-colors">
                  Add Member
              </p>
          </button>
        </div>

      </main>
    </div>
  );
};

export default RoyalDashboard;