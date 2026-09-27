// import { Children, createContext, useState } from "react";
// import React from "react";

// export const MyContext = createContext(null);
// export function cartProvider(props){
//   const [cartElemnt, setCartElement] = useState("");
//   return (
//     <div>
//       <MyContext.Provider value={{ cartElemnt, setCartElement }}>
//         {props.children}
//       </MyContext.Provider>
//     </div>
//   );
// };
// export cartProvider();









// import { createContext, useState } from "react";



// export const MyContext = createContext(null);

// export function CartProvider({ children }) {
//   const [cartElement, setCartElement] = useState([
//     { item: "Shoes" ,
//      price : 10000 }
//   ])
//   return (
//     <MyContext.Provider value={{ cartElement, setCartElement }}>
//       {children}
//     </MyContext.Provider>
//   );
// }


import React, { useState,useEffect,useContext } from 'react'
import { createContext } from 'react'

// create a context of a cart
export const cartItems = createContext(null)



function CartProvider({children}) {
    const [items, setItem] = useState(() => {
    try {
      const savedCart = localStorage.getItem("myCart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return [];
    }
  }

);
useEffect(() => {
  localStorage.setItem("myCart", JSON.stringify(items));
}, [items]);
  return (
    <div>
        <cartItems.Provider value={{items , setItem }}>
            {children}
        </cartItems.Provider>
      
    </div>
  )
}

export const useItem = ()=>{
  return useContext(cartItems)
}
export default CartProvider


