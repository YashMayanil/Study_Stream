import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useToast } from './Toast';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'DSA', to: '/videos/dsa' },
  { label: 'Web Dev', to: '/videos/web-dev' },
  { label: 'Class 11', to: '/videos/class-11' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Read user from localStorage on mount + on storage changes
  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem('user');
      setUser(stored ? JSON.parse(stored) : null);
    };
    loadUser();
    // 'storage' fires when another tab changes localStorage
    window.addEventListener('storage', loadUser);
    // 'userUpdated' fires when login/register happens in THIS tab
    window.addEventListener('userUpdated', loadUser);
    return () => {
      window.removeEventListener('storage', loadUser);
      window.removeEventListener('userUpdated', loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setProfileOpen(false);
    showToast({ type: 'info', title: 'Signed out', message: 'See you next time! Keep learning 📚' });
    navigate('/');
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/5 shadow-xl shadow-black/30' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow duration-300">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span className="text-lg font-bold text-white tracking-tight" style={{fontFamily:'Syne,sans-serif'}}>
              Study<span className="text-blue-400">Stream</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to}
                className={({isActive}) => `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/watch-later"
              className={({isActive}) => `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${isActive ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Watch Later
            </NavLink>
            <NavLink to="/favourites"
              className={({isActive}) => `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${isActive ? 'text-pink-400 bg-pink-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
              Favourites
            </NavLink>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              /* Profile dropdown — shown when logged in */
              <div className="relative" ref={profileRef}>
                <button onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 transition-all duration-200">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                    {user.username?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm text-slate-300 font-medium">{user.username}</span>
                  <svg className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                  </svg>
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 glass border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden animate-fade-in">
                    {/* Profile header */}
                    <div className="p-4 border-b border-white/8">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                          {user.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white" style={{fontFamily:'Syne,sans-serif'}}>{user.username}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    {/* Menu items */}
                    <div className="p-2">
                      {[
                        {icon:'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z', label:'Watch Later', to:'/watch-later', color:'text-amber-400'},
                        {icon:'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z', label:'Favourites', to:'/favourites', color:'text-pink-400'},
                      ].map(item => (
                        <Link key={item.label} to={item.to} onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all duration-150 group">
                          <svg className={`w-4 h-4 ${item.color || 'text-slate-500'} transition-colors`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d={item.icon}/>
                          </svg>
                          <span className="text-sm text-slate-400 group-hover:text-white transition-colors">{item.label}</span>
                        </Link>
                      ))}
                      <div className="mt-1 pt-1 border-t border-white/8">
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 transition-all duration-150 group">
                          <svg className="w-4 h-4 text-red-500/60 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                          </svg>
                          <span className="text-sm text-red-500/60 group-hover:text-red-400 transition-colors">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Login / Register — shown when logged out */
              <div className="flex items-center gap-2">
                <Link to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 hover:bg-white/5">
                  Sign In
                </Link>
                <Link to="/register"
                  className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}/>
              <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}/>
              <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="glass border-t border-white/5 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
              className={({isActive}) => `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/watch-later" onClick={() => setMenuOpen(false)}
            className={({isActive}) => `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Watch Later
          </NavLink>
          <NavLink to="/favourites" onClick={() => setMenuOpen(false)}
            className={({isActive}) => `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'text-pink-400 bg-pink-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
            Favourites
          </NavLink>
          <div className="pt-3 border-t border-white/5 flex gap-2">
            <button onClick={() => { navigate('/login'); setMenuOpen(false); }}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-300 border border-white/10 rounded-lg transition-all hover:bg-white/5">Login</button>
            <button onClick={() => { navigate('/register'); setMenuOpen(false); }}
              className="flex-1 px-4 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg transition-all">Register</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
