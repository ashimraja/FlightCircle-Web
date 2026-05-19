import { ArrowRight, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { images } from "../assets";
import { useI18n } from "../i18n/I18nProvider";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-slate-200 bg-white/90 text-slate-700">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-14 sm:px-8 lg:px-10 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-3 flex items-start gap-4">
          <img
            src={images.img_logo}
            alt="Flight Circle logo"
            className="h-10 w-20 object-contain"
          />
          <div>
            <p className="text-lg font-semibold text-slate-900">
              {t("navbar.brand")}
            </p>
            <p className="max-w-md text-sm leading-6 text-slate-600">
              {t("footer.description")}
            </p>
          </div>
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
              <span>{t("footer.contact_email")}</span>
            </div>
            <div className="flex items-center gap-3">
              <a aria-label="Instagram" href="#">
                <Instagram size={18} />
              </a>
              <a aria-label="Twitter" href="#">
                <Twitter size={18} />
              </a>
              <a aria-label="LinkedIn" href="#">
                <Linkedin size={18} />
              </a>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              <Link to="/terms" className="mr-4">
                {t("footer.terms")}
              </Link>
              <Link to="/privacy">{t("footer.privacy")}</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50 px-6 py-5 text-sm text-slate-500 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span>{t("footer.copyright")}</span>
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-brand font-medium"
          >
            {t("footer.return_to_top")} <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
