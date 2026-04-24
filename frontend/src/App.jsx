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
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="min-h-screen bg-dark-950">
        <Navbar />
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/videos/:categorySlug" element={<VideosPage />} />
            <Route path="/videos" element={<ProtectedRoute><VideosPage /></ProtectedRoute>} />
            <Route path="/watch/:id" element={<ProtectedRoute><WatchPage /></ProtectedRoute>} />
            <Route path="/watch-later" element={<ProtectedRoute><WatchLater /></ProtectedRoute>} />
            <Route path="/favourites" element={<ProtectedRoute><Favourites /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        <Footer />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}
