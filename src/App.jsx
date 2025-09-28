import { Routes, Route } from 'react-router-dom';
import { TranslationProvider } from './contexts/TranslationContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SymptomChecker from './pages/SymptomChecker';
import VanIntegration from './pages/VanIntegration';
import About from './pages/About';
import Contact from './pages/Contact';
import TestPage from './pages/TestPage';
import Footer from './components/Footer';

function App() {
  return (
    <TranslationProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/van-integration" element={<VanIntegration />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </TranslationProvider>
  );
}

export default App;