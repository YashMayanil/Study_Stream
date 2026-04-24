import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VideoCard from '../components/VideoCard';

export default function Favourites() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ss_favourites') || '[]');
    setFavs(saved);
  }, []);

  const removeVideo = (id) => {
    const updated = favs.filter(v => v !== id);
    localStorage.setItem('ss_favourites', JSON.stringify(updated));
    setFavs(updated);
  };

  const filtered = videos.filter(v => favs.includes(v.id));

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white" style={{fontFamily:'Syne,sans-serif'}}>Favourites</h1>
              <p className="text-slate-500 text-sm">{filtered.length} favourite video{filtered.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8"/>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-pink-500/10 border border-pink-500/15 flex items-center justify-center mb-5">
              <svg className="w-9 h-9 text-pink-400/50" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No favourites yet</h3>
            <p className="text-slate-500 text-sm mb-6">Hit the heart icon on any video to add it here</p>
            <Link to="/" className="px-6 py-3 bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/20 text-pink-300 font-medium rounded-xl transition-all duration-200 text-sm">
              Browse Videos →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
            {filtered.map(video => (
              <div key={video.id} className="relative group">
                <VideoCard video={video} />
                <button onClick={() => removeVideo(video.id)}
                  className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-black/70 hover:bg-red-500/80 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                  title="Remove from Favourites">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
