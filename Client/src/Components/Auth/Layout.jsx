import { Outlet } from "react-router-dom";

import React from 'react'

function AuthLayout() {
  return (
    <> 
    <div className="h-full border-2 border-amber-200">
      this auth layout
    </div>
    <div className="h-full border-2 border-amber-200">
        <Outlet/>
    </div>
    </>
  )
}

export default AuthLayout
