import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import VideoCard from '../components/VideoCard';
import Loader from '../components/Loader';
import { categories } from '../data/mockData';
import { getVideo } from '../services/api.js';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);

      const res = await getVideo("dsa"); // it shoudl be fixed

      setVideos(res.data.videos);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/8 blur-3xl rounded-full" />
          <div className="absolute top-40 left-1/4 w-64 h-64 bg-violet-600/6 blur-3xl rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 mb-8 animate-fade-in">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-medium text-blue-300 tracking-wide">Distraction-Free Learning</span>
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Learn Without
            <br />
            <span className="text-gradient">Distractions.</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Curated educational videos for Class 10–12, DSA, and Web Development.
            No ads, no noise — just pure focused learning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              to="/videos/dsa"
              className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 hover:-translate-y-0.5"
            >
              Start Learning
            </Link>
            <Link
              to="/register"
              className="px-7 py-3.5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium rounded-xl transition-all duration-200 hover:bg-white/5"
            >
              Create Account →
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="max-w-2xl mx-auto mt-16 grid grid-cols-3 gap-4 animate-fade-in">
          {[
            { value: '750+', label: 'Videos' },
            { value: '5', label: 'Subjects' },
            { value: '100%', label: 'Ad-Free' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 glass-card rounded-xl">
              <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              Browse by Subject
            </h2>
            <span className="text-sm text-slate-500">{categories.length} categories</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              Popular Right Now
            </h2>
            <Link to="/videos/dsa" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {videos.slice(0, 4).map((video) => (
              <VideoCard key={video._id || video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner — only shown to guests */}
      {!user && (
        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden p-10 text-center glass-card border border-blue-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-violet-600/5 -z-10" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />
              <h3 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                Ready to level up?
              </h3>
              <p className="text-slate-400 mb-7">Join thousands of students studying smarter every day.</p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25"
              >
                Get Started — It's Free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
