import { Routes, Route } from 'react-router-dom';
// import AuthLayout from './Components/Auth/Layout';
// import Login from './Pages/Auth/Login';
// import Register from './Pages/Auth/Register';
import Dashboad from './Pages/Admin-view/Dashboad';
import Order from './Pages/Admin-view/Order';
import Product from './Pages/Admin-view/Product';
import Home from './Pages/User-pages/Home';
import Cart from './Pages/User-pages/Cart';
import Profile from './Pages/User-pages/Profile';
import AdminLayout from './Pages/Admin-view/Layout';
import HomeLayout from './Components/User-view/Layout';
import Item from './Pages/User-pages/Item';
import NewProduct from './Pages/Admin-view/NewProduct';
import Users from './Pages/Admin-view/Users';
import Aboutus from './Components/User-view/Aboutus';
import Contact from './Pages/User-pages/Contact';
import { User } from 'lucide-react';
import Test from './Test';
import SiteSettings from './Pages/Admin-view/Sitevisuals'
import Login from './Pages/Auth/Login';
import Collection from './Components/Admin-view/Collection';
import NotFound from './Pages/Not-Found/NotFound';
import Signup from './Pages/Auth/Signup'
import Checkout from './Pages/User-pages/Checkoout';
import PaymentSuccess from './Pages/User-pages/Paymentsucess';
import OrderTracking from './Pages/User-pages/OnderDetails'
function App() {
  return (
    <>
    <Routes>
        <Route path='/Admin' element={<AdminLayout/>}> 
              <Route path='newproduct' element={<NewProduct/>}/>
              <Route path='Users' element={< Users/>}/>
              <Route path='Dashboad' element={<Dashboad/>}/>
              <Route path='Order' element={<Order/>}/>
              <Route path='product' element={<Product/>}/>
              <Route path='sitevisuals' element={<SiteSettings/>}/>
        </Route>
        <Route path='/' element={<HomeLayout/>}> 
              <Route path='' element={ <Home/>}/>
              <Route path='Aboutus' element={ <Aboutus/>}/>
              <Route path='contactus' element={ <Contact/>}/>
              <Route path='products' element={<Product/>}/>
        </Route> 
              <Route path='cart' element={ <Cart/>}/>
              <Route path='Profile' element={ <Profile/>}/>
              <Route path='checkout' element={ <Checkout/>}/>
              <Route path='paymentsuccess' element={ <PaymentSuccess/>}/>
              <Route path='orderTracking' element={ <OrderTracking/>}/>
              <Route path='Login' element={ <Login/>}/> 
              <Route path='Signup' element={ <Signup/>}/> 
          {/* <Route path='/*' element={<Test/>}/> */}
          <Route path='/*' element={<NotFound/>}/>
    </Routes>
    </>
  )
}
export default App




