import React from 'react';
import Navbar from '../Components/Navbar';
import Slider from '../Components/Slider';
import Leftside from '../Components/LeftSide/Leftside';
import { Outlet } from 'react-router';
import Rightside from '../Components/RightSide/Rightside';
import Footer from '../Components/Footer/Footer';

const HomeLayout = () => {
    const images = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBPST1Mq09G_rx4TrSP2Ls-ZXqqOICS7hTkw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVZqzYsU1EOLepVVQxoKFDjf_opp9HzhtSzGpE6_Bw6ss3AZypFnwfe-YGTGuTglzqdA&usqp=CAU',
  { src: 'https://static.vecteezy.com/system/resources/thumbnails/024/107/469/small/3d-render-baby-birthday-cake-with-toy-on-glossy-light-gray-background-photo.jpg', alt: 'random' },
];
    return (
        <div className="min-h-screen">
            <header className='w-full px-2 sm:px-4 lg:px-6 xl:w-11/12 xl:mx-auto'>
                <Navbar></Navbar>
                <div className="relative z-10 mt-2">
                    <Slider slides={images} autoplay={{ delay: 2500, disableOnInteraction: false }}></Slider>
                </div>
            </header>

            <main className='w-full px-2 sm:px-4 lg:px-6 xl:w-11/12 xl:mx-auto my-3'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-5'>
                    <aside className='lg:col-span-3 order-2 lg:order-1'>
                        <Leftside></Leftside>
                    </aside>

                    <section className='lg:col-span-9 order-1 lg:order-2'>
                        <Outlet></Outlet>
                    </section>

                    {/* <aside className='col-span-3'>
                        <Rightside></Rightside>
                    </aside> */}
                </div>
            </main>

            <footer className="mt-8">
                {/* Footer content can be added here */}
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default HomeLayout;