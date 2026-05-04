import { BrowserRouter, Routes, Route } from 'react-router-dom';
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./pages/Footer'));
const Home = lazy(() => import('./pages/Home'));
const VideosPage = lazy(() => import('./pages/VideosPage'));
const WatchPage = lazy(() => import('./pages/WatchPage'));
const WatchLater = lazy(() => import('./pages/WatchLater'));
const Favourites = lazy(() => import('./pages/Favourites'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
import Footer from './pages/Footer';
import Loader from './components/Loader';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
         <Suspense fallback={<div className="text-white text-center mt-20"><Loader></Loader></div>}>
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
      </Suspense>
      </ToastProvider>
    </BrowserRouter>
  );
}
