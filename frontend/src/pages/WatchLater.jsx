import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { videos } from '../data/mockData';

export default function WatchLater() {
  const [watchLater, setWatchLater] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ss_watch_later') || '[]');
    setWatchLater(saved);
  }, []);

  const removeVideo = (id) => {
    const updated = watchLater.filter(v => v !== id);
    localStorage.setItem('ss_watch_later', JSON.stringify(updated));
    setWatchLater(updated);
  };

  const filtered = videos.filter(v => watchLater.includes(v.id));

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white" style={{fontFamily:'Syne,sans-serif'}}>Watch Later</h1>
              <p className="text-slate-500 text-sm">{filtered.length} saved video{filtered.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8"/>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center mb-5">
              <svg className="w-9 h-9 text-amber-400/50" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No videos saved yet</h3>
            <p className="text-slate-500 text-sm mb-6">Hit the clock icon on any video to save it for later</p>
            <Link to="/" className="px-6 py-3 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/20 text-amber-300 font-medium rounded-xl transition-all duration-200 text-sm">
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
                  title="Remove from Watch Later">
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
