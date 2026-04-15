import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import Loader from '../components/Loader';
import { getVideo } from '../services/api';

export default function VideosPage() {
  const { categorySlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, [categorySlug]);

  const fetchVideos = async () => {
    try {
      setLoading(true);

      const res = await getVideo(categorySlug);

      setVideos(res.data.videos);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

const filtered = videos.filter((v) => {
  const matchSearch = search
    ? v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.channelTitle.toLowerCase().includes(search.toLowerCase())
    : true;
  return matchSearch;
});



  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        
        <div className="mb-8 animate-fade-in">
          <div className="flex items-start justify-between gap-4 flex-wrap">

            {/* Left Section */}
            <div>
              <h1
                className="text-3xl font-bold text-white capitalize"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {categorySlug} Videos
              </h1>

              <p className="text-slate-500 mt-1 text-sm">
                {filtered.length} videos available
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <input
                type="text"
                placeholder="Search videos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-dark-700 border border-white/8 rounded-xl text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/40 focus:bg-dark-600 transition-all duration-200"
              />
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8" />

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="lg" text="Loading videos..." />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-slate-300 mb-2">No videos found</h3>
            <p className="text-slate-500 text-sm">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
            {filtered.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
