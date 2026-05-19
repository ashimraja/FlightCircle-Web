import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import { images } from '../assets';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Search', href: '/search' },
    { label: 'Deals', href: '/deals' },
    { label: 'Why Flight Circle', href: '/why' },
    { label: 'Testimonials', href: '/testimonials' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-10">
        <Link to="/" className="flex items-center gap-3 font-semibold text-slate-900">
          <img
            src={images.img_logo}
            alt="Flight Circle logo"
            className="h-8 w-16 sm:h-12 sm:w-24 object-contain"
          />
          <div className="hidden sm:block">
            <p className="text-lg">Flight Circle</p>
            <p className="text-xs text-slate-500">Premium flight discovery</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className="transition hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900 sm:inline-flex">
            <Globe size={16} />
            EN
          </button>
          <Link
            to="/search"
            className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark sm:inline-flex"
          >
            Start search
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white transition hover:border-brand/60"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200/80 bg-white px-6 py-4">
          <nav className="space-y-4 text-sm text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 font-medium text-slate-900 transition hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
            <div className="rounded-2xl border-t border-slate-200 pt-4">
              <button className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300">
                <Globe size={16} />
                EN
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

