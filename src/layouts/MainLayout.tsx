import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-6 sm:px-8 lg:px-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
