import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAutoScroll } from './hooks/useAutoScroll';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Work from './pages/Work';
import Footer from "./components/Footer.tsx"

import Contact from './pages/Contact';

function AppContent() {
  // Enable auto-scroll on route changes
  useAutoScroll();

  return (
    <div className="dark scroll-smooth bg-neutral-950 text-white min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;