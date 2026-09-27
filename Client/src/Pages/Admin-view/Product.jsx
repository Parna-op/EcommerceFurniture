import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import Collection from '../../Components/Admin-view/Collection';
import Filtersection from '../../Components/User-view/Filtersection';
import Productlayout from '../../Components/User-view/Productlayout';
const Product = ()=> {
  return (
<>
<div className='flex flex-col w-full h-full'>
 <div id="filter" className='relative h-full top-8'>
<Filtersection/>
 </div>
 <div id="showProduct" className='flex justify-between h-full'>
 <Productlayout search={"getProduct"}/>
 </div>
</div>
</>
  )
}
export default Product
