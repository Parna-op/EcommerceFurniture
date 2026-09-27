import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Store from '../../Test.jsx'

function HomeLayout() {
  return (
    <div className='min-h-screen bg-gray-100'>
      <div id='Navbar' className="fixed top-0 left-0 z-50 w-full shadow-sm bg-white/90 backdrop-blur-md">
        <Header />
      </div>
      <main className="relative w-full h-full pt-16">
        <Outlet /> 
      </main>

    </div>
  );
}

export default HomeLayout;
