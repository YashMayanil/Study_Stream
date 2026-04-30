import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { getMe, toggleWatchLater } from '../services/api.js';

export default function WatchLater() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removing, setRemoving] = useState(null); // track which video is being removed

  useEffect(() => {
    fetchWatchLater();
  }, []);

  const fetchWatchLater = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getMe();
      // getMe populates watchLater with full video objects
      setVideos(res.data.user.watchLater || []);
    } catch (err) {
      console.error('Failed to fetch watch later:', err);
      setError('Please log in to see your Watch Later list.');
    } finally {
      setLoading(false);
    }
  };

  const removeVideo = async (videoId) => {
    try {
      setRemoving(videoId);
      await toggleWatchLater(videoId);
      // Remove from local state immediately for instant UI update
      setVideos(prev => prev.filter(v => (v._id || v.id) !== videoId));
    } catch (err) {
      console.error('Failed to remove from watch later:', err);
    } finally {
      setRemoving(null);
    }
  };

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
              <p className="text-slate-500 text-sm">
                {loading ? 'Loading...' : `${videos.length} saved video${videos.length !== 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8"/>

        {loading ? (
          <div className="flex justify-center items-center py-28">
            <div className="w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-28 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center mb-5">
              <svg className="w-9 h-9 text-amber-400/50" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">Login Required</h3>
            <p className="text-slate-500 text-sm mb-6">{error}</p>
            <Link to="/login" className="px-6 py-3 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/20 text-amber-300 font-medium rounded-xl transition-all duration-200 text-sm">
              Log In →
            </Link>
          </div>
        ) : videos.length === 0 ? (
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
            {videos.map(video => (
              <div key={video._id || video.id} className="relative group">
                <VideoCard video={video} />
                <button
                  onClick={() => removeVideo(video._id || video.id)}
                  disabled={removing === (video._id || video.id)}
                  className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-black/70 hover:bg-red-500/80 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 disabled:opacity-60"
                  title="Remove from Watch Later"
                >
                  {removing === (video._id || video.id) ? (
                    <div className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
