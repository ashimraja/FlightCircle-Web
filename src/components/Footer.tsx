import { ArrowRight, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/90 text-slate-700">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-14 sm:px-8 lg:px-10 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-slate-900">Flight Circle</p>
          <p className="max-w-md text-sm leading-6 text-slate-600">
            A crafted booking experience designed for premium travelers and polished presentations.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Company</p>
            <div className="space-y-2 text-sm text-slate-600">
              <Link to="/">Home</Link>
              <Link to="/search">Search</Link>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Support</p>
            <div className="space-y-2 text-sm text-slate-600">
              <a href="#why">Why Flight Circle</a>
              <a href="#testimonials">Testimonials</a>
            </div>
          </div>
          <div className="space-y-3 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Stay in touch</p>
            <div className="flex items-center gap-3 text-slate-500">
              <Mail size={16} />
              <span>hello@flightcircle.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Instagram size={18} />
              <Twitter size={18} />
              <Linkedin size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50 px-6 py-5 text-sm text-slate-500 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Flight Circle. Designed with a premium travel mindset.</span>
          <a href="#top" className="inline-flex items-center gap-2 text-brand font-medium">
            Return to top <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
