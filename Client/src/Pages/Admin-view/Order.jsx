import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Download, 
  ChevronDown, 
  ArrowUpDown,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data
  const orders = [
    {
      id: '#ORD-72945',
      customer: { name: 'Alex Morgan', email: 'alex@example.com' },
      date: 'Feb 07, 2026',
      amount: '$1,250.00',
      paymentStatus: 'Paid',
      orderStatus: 'Processing',
    },
    {
      id: '#ORD-72946',
      customer: { name: 'Sarah Jones', email: 'sarah@design.co' },
      date: 'Feb 06, 2026',
      amount: '$850.00',
      paymentStatus: 'Pending',
      orderStatus: 'Pending',
    },
    {
      id: '#ORD-72947',
      customer: { name: 'Michael Chen', email: 'mike.c@tech.io' },
      date: 'Feb 05, 2026',
      amount: '$2,400.00',
      paymentStatus: 'Failed',
      orderStatus: 'Cancelled',
    },
    {
      id: '#ORD-72948',
      customer: { name: 'Emma Wilson', email: 'emma.w@gmail.com' },
      date: 'Feb 04, 2026',
      amount: '$420.00',
      paymentStatus: 'Paid',
      orderStatus: 'Shipped',
    },
    {
      id: '#ORD-72949',
      customer: { name: 'James Carter', email: 'james@carter.com' },
      date: 'Feb 04, 2026',
      amount: '$1,100.00',
      paymentStatus: 'Paid',
      orderStatus: 'Delivered',
    },
  ];

  // Helper for Payment Status Colors
  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'Pending': return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
      case 'Failed': return 'bg-red-50 text-red-700 ring-red-600/20';
      default: return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    }
  };

  // Helper for Order Status Colors
  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-50';
      case 'Shipped': return 'text-blue-600 bg-blue-50';
      case 'Processing': return 'text-orange-600 bg-orange-50';
      case 'Cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen p-6 pt-24 bg-gray-50/50 md:p-8">
      <div className="mx-auto space-y-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
            <p className="mt-1 text-sm text-gray-500">Manage and track all customer orders.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-black rounded-lg shadow-sm hover:bg-gray-800">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Stats Cards (Optional Quick View) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
           <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
             <div className="flex items-start justify-between">
               <div>
                 <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                 <h3 className="mt-2 text-2xl font-semibold text-gray-900">$48,250.00</h3>
               </div>
               <div className="p-2 rounded-lg bg-green-50">
                 <CheckCircle className="w-5 h-5 text-green-600" />
               </div>
             </div>
           </div>
           {/* Add more stats as needed */}
        </div>

        {/* Main Table Card */}
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          
          {/* Table Toolbar */}
          <div className="flex items-center gap-4 p-4 border-b border-gray-200">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <input 
                type="text" 
                placeholder="Search orders..." 
                className="w-full py-2 pl-10 pr-4 text-sm transition-all border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-medium tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50/50">
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                      Order ID <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="transition-colors hover:bg-gray-50/50 group">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{order.customer.name}</span>
                        <span className="text-xs text-gray-500">{order.customer.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${getOrderStatusColor(order.orderStatus)}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {order.orderStatus}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                        <button className="p-2 text-gray-400 transition-colors rounded-lg hover:text-gray-600 hover:bg-gray-100" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 transition-colors rounded-lg hover:text-gray-600 hover:bg-gray-100">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer / Pagination */}
          <div className="flex items-center justify-between p-4 text-sm text-gray-500 border-t border-gray-200">
            <span>Showing 1-5 of 48 orders</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">Previous</button>
              <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Next</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
