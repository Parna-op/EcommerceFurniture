import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from '../../Components/Admin-view/Adminnavber'

function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Navbar Wrapper - Sticky at the top */}
      <div className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <AdminNavbar/>    
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full px-4 py-6 mx-auto sm:px-6 lg:px-8 max-w-[1920px]">
        
        {/* Dashboard Container 
            - Replaced 'top-12' with proper flex/padding 
            - Added min-h to ensure it looks substantial even with empty content
        */}
        <div className="relative flex flex-col w-full min-h-[85vh] p-4 bg-white border border-amber-900/10 rounded-2xl shadow-sm sm:p-6">
          <Outlet />
        </div>
        
      </main>
    </div>
  );
}

export default AdminLayout;
