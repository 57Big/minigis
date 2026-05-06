import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function MainLayout() {
  const { pathname } = useLocation();
  const isMap = pathname.startsWith('/map');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div
      className={`flex flex-col bg-[#f6f8fc] text-ink-800 dark:bg-[#050813] dark:text-slate-100 ${
        isMap ? 'h-screen' : 'min-h-screen'
      }`}
    >
      <Navbar />
      <main className={isMap ? 'flex-1 min-h-0 overflow-hidden' : 'flex-1'}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
