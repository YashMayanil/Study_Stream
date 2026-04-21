const Footer = () => {
    return (
<footer className="border-t border-white/5 py-8 px-4 mt-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <span className="text-sm font-semibold text-slate-400" style={{fontFamily:'Syne,sans-serif'}}>StudyStream</span>
            </div>
            <p className="text-xs text-slate-600">© 2025 StudyStream. No ads. No distractions. Just learning.</p>
            <div className="flex gap-4">
              {['Privacy', 'Terms', 'Contact'].map(item => (
                <button key={item} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{item}</button>
              ))}
            </div>
          </div>
        </footer>

    );
};
export default Footer;