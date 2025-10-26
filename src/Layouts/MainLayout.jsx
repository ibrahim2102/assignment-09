import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer/Footer';

const MainLayout = () => {
    return (
        <div className="min-h-screen">
            <Navbar></Navbar>
            
            <main className='w-full px-2 sm:px-4 lg:px-6 xl:w-11/12 xl:mx-auto my-3'>
                <Outlet></Outlet>
            </main>

            <footer className="mt-8">
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;
