import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import SearchResults from '../pages/SearchResults';
import FlightDetails from '../pages/FlightDetails';
import TravellerDetails from '../pages/TravellerDetails';
import Payment from '../pages/Payment';
import Success from '../pages/Success';
import Deals from '../pages/Deals';
import Why from '../pages/Why';
import Testimonials from '../pages/Testimonials';

const pageTransition = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="min-h-screen"
        >
          <Routes location={location} key={location.pathname}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/details/:flightId" element={<FlightDetails />} />
              <Route path="/traveller-details" element={<TravellerDetails />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/success" element={<Success />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/why" element={<Why />} />
              <Route path="/testimonials" element={<Testimonials />} />
            </Route>
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
