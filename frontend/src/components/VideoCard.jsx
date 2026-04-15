import { Link } from 'react-router-dom';

export default function VideoCard({ video }) {
  return (
    <Link
      to={`/watch/${video._id || video._id}`}
      className="group block rounded-xl overflow-hidden glass-card transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 glow-blue-hover"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-dark-700">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
          }}
        />
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-mono px-1.5 py-0.5 rounded">
          {video.duration}
        </div>
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-blue-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-blue-500/30">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-slate-200 line-clamp-2 leading-snug group-hover:text-blue-300 transition-colors duration-200">
          {video.title}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-slate-500">{video.channel}</p>
          <p className="text-xs text-slate-600">{video.views} views</p>
        </div>
      </div>
    </Link>
  );
}
