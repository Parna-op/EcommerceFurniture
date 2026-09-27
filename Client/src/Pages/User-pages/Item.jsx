// import React from 'react'
// import { useContext } from 'react'
// import { MyContext } from '../../context/CartProvider'
// function Item(props) {
//     const iitem = useContext( MyContext)
//     const handleAdd = ()=>{
//       console.log("button click")
//       // console.log(item.cartElement)
//       iitem.setCartElement((prevs)=> ([...prevs,{item: props.item , price : props.price}]))
//       console.log(iitem.cartElement)
      
//     }
    
//   return (
//     <div>
//       <div className="item">
//         <p>{props.item}</p>
//         <p>price : {props.price} </p>
//         <button type='button' className='border border-amber-950' onClick={handleAdd} >Add to cart</button>
//       </div>
//     </div>
//   )
// }

// export default Item



import React from 'react'

import { useContext } from 'react'
import { useItem } from '../../context/CartContext'
function Item(props) {
  const a = useContext(useItem);
  const handleAddcart = ()=>{
   const isExist = a.item.some(product => product.id == props.id) 
   if( !isExist){
    a.setItem(prevs => [
      ...prevs,
      {
        id:props.id,
        name:props.item,
        price: props.price,
        count:props.count}])
    a.setItemCounter(prevs =>(prevs+1))
   }
   else{
    a.setItem(prev => 
    prev.map((p) => p.id==props.id ? {...p,count:p.count+1} : p )
  )
   }
  }
  return (
    <div>
      <div id="product" className="border border-b-black h-[300px] w-[300px]  flex justify-center items-center flex-col">
        {/* <div id="div">
        </div> */}
        <div class="w-[190px] h-[254px] rounded-[30px] bg-[#ffebeb]
            shadow-[8px_8px_20px_rgb(40,40,40),-8px_-8px_20px_rgb(80,80,80)]
            hover:shadow-[4px_4px_10px_rgb(40,40,40),-4px_-4px_10px_rgb(80,80,80)]
            transition-shadow duration-300 flex justify-center items-center flex-col">
         <div id="div" className='border border-b-black h-[100px] w-[100px]'>
        {/* <img src="" alt="" /> */}
        </div> 
              <p id='description'>w{props.name}</p>
              <p id='price'>w{props.price}</p>
        <button className='w-40 p-1 text-center rounded-md h-9 bg-amber-200 border-b-black' onClick={handleAddcart}>Add Cart</button>
</div>

      </div>
    </div>
  )
}

export default Item

