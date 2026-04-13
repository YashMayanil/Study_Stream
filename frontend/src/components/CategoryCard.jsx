import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/videos/${category.slug}`}
      className={`group relative block rounded-2xl overflow-hidden p-6 bg-gradient-to-br ${category.color} border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-white/10 cursor-pointer`}
      style={{ '--accent': category.accent }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 rounded-2xl"
        style={{ background: `radial-gradient(circle at center, ${category.accent}22, transparent 70%)` }}
      />

      {/* Corner decoration */}
      <div
        className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-bl-full"
        style={{ background: `radial-gradient(circle at top right, ${category.accent}, transparent 70%)` }}
      />

      {/* Icon */}
      <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 inline-block">
        {category.icon}
      </div>

      {/* Title */}
      <h3
        className="font-display text-xl font-700 text-white mb-1 transition-colors duration-200"
        style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
      >
        {category.title}
      </h3>

      <p className="text-sm text-slate-400 mb-4 leading-snug">{category.description}</p>

      {/* Meta */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-slate-500">{category.videoCount} videos</span>
        <div
          className="flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
          style={{ color: category.accent }}
        >
          Explore
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
        style={{ background: `linear-gradient(to right, ${category.accent}, transparent)` }}
      />
    </Link>
  );
}
