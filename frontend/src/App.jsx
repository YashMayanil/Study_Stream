import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VideosPage from './pages/VideosPage';
import WatchPage from './pages/WatchPage';
import WatchLater from './pages/WatchLater';
import Favourites from './pages/Favourites';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './pages/Footer'; 
import { ToastProvider } from './components/Toast';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="min-h-screen bg-dark-950">
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/videos/:categorySlug" element={<VideosPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/watch/:id" element={<WatchPage />} />
            <Route path="/watch-later" element={<WatchLater />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        <Footer />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}
