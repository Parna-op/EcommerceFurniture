import React from 'react'
import { NavLink } from 'react-router-dom'
import { Search, Menu, ShoppingCart } from "lucide-react";
function Dashboad() {
  return (
    <>
    <div className="flex items-center gap-4 p-4">
      <Menu size={26} />
      <Search size={26} />
      <ShoppingCart size={26} color="purple" strokeWidth={1.5} />
    </div>
    </>
  )
}

export default Dashboad
