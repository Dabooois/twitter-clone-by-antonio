import Link from 'next/link';
import React, { ReactNode } from 'react';
import Followbar from './layout/Followbar';
import Sidebar from './layout/Sidebar';

type TProps = {
  children: ReactNode;
};

const Layout: React.FC<TProps> = ({ children }) => {
  return (
    <>
      <div className='h-screen bg-black'>
        <div className='container  mx-auto xl:px-32 max-w-7xl h-full'>
          <div className='grid grid-cols-4 h-full'>
            <Sidebar />
            <div className='col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800'>
              {children}
            </div>
            <Followbar />
          </div>
        </div>
      </div>
      {/* <header className='w-full bg-teal-400 px-8 py-16'>
        <nav>
          <Link href={'/home'}>Hello</Link>
        </nav>
      </header> */}
    </>
  );
};

export default Layout;
