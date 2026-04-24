import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import DotWaveBackground from './components/DotWaveBackground';

import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Partners from './pages/Partners';
import Join from './pages/Join';
import Support from './pages/Support';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' }), [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <DotWaveBackground />
      <div className="relative z-10">
        <ScrollProgress />
        <ScrollToTop />
        <Navbar />

        <div className="pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/join" element={<Join />} />
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  );
}
