import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { I18nProvider } from "../i18n/I18nProvider";

export default function MainLayout() {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-6 sm:px-8 lg:px-10">
          <Outlet />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
