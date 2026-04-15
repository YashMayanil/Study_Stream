import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getVideoById } from '../services/api';

export default function WatchPage() {
  const [video,setVideo] = useState(null)
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
  fetchVideo();
}, [id]);

const fetchVideo = async () => {
  try {
    const res = await getVideoById(id);
    setVideo(res.data);
  } catch (error) {
    console.error(error);
  }
};

  const [notesOpen, setNotesOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const [favAnim, setFavAnim] = useState(false);
  const [wlAnim, setWlAnim] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);

  useEffect(() => {
    if (!id) return;
    // Load notes for this video
    const allNotes = JSON.parse(localStorage.getItem('ss_notes') || '{}');
    setSavedNotes(allNotes[id] || []);
    // Load fav / watch later state
    const favs = JSON.parse(localStorage.getItem('ss_favourites') || '[]');
    const wl = JSON.parse(localStorage.getItem('ss_watch_later') || '[]');
    setIsFav(favs.includes(id));
    setIsWatchLater(wl.includes(id));
  }, [id]);

  if (!video) {
  return (
    <div className="min-h-screen flex justify-center items-center text-white">
      Loading...
    </div>
  );
}

  const toggleFav = () => {
    const favs = JSON.parse(localStorage.getItem('ss_favourites') || '[]');
    let updated;
    if (isFav) {
      updated = favs.filter(item => item !== id);
    } else {
      updated = [...favs, id];
      setFavAnim(true);
      setTimeout(() => setFavAnim(false), 600);
    }
    localStorage.setItem('ss_favourites', JSON.stringify(updated));
    setIsFav(!isFav);
  };

  const toggleWatchLater = () => {
    const wl = JSON.parse(localStorage.getItem('ss_watch_later') || '[]');
    let updated;
    if (isWatchLater) {
      updated = wl.filter(item => item !== id);
    } else {
      updated = [...wl, id];
      setWlAnim(true);
      setTimeout(() => setWlAnim(false), 600);
    }
    localStorage.setItem('ss_watch_later', JSON.stringify(updated));
    setIsWatchLater(!isWatchLater);
  };

  const saveNote = () => {
    if (!noteText.trim()) return;
    const allNotes = JSON.parse(localStorage.getItem('ss_notes') || '{}');
    const newNote = {
      id: Date.now(),
      text: noteText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString(),
    };
    const updated = [...(allNotes[id] || []), newNote];
    allNotes[id] = updated;
    localStorage.setItem('ss_notes', JSON.stringify(allNotes));
    setSavedNotes(updated);
    setNoteText('');
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const deleteNote = (noteId) => {
    const allNotes = JSON.parse(localStorage.getItem('ss_notes') || '{}');
    const updated = (allNotes[id] || []).filter(n => n.id !== noteId);
    allNotes[id] = updated;
    localStorage.setItem('ss_notes', JSON.stringify(allNotes));
    setSavedNotes(updated);
  };

  if (!video) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
        <div className="text-5xl">📹</div>
        <h2 className="text-2xl font-bold text-white">Video not found</h2>
        <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm">← Back to Home</Link>
      </div>
    );
  }


  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back */}
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-5 mt-4 group">
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
          </svg>
          Back
        </button>

        {/* Main layout: video + floating action bar */}
        <div className="flex gap-4 items-start">
          {/* Floating left action bar */}
          <div className="hidden lg:flex flex-col items-center gap-2 pt-2 sticky top-24">
            {/* Notes button */}
            <button onClick={() => setNotesOpen(!notesOpen)}
              className={`group relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 border ${notesOpen ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' : 'bg-white/5 border-white/8 text-slate-400 hover:bg-white/10 hover:border-white/15 hover:text-white'}`}
              title="Take Notes">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
              </svg>
              {savedNotes.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-[9px] font-bold text-white flex items-center justify-center">
                  {savedNotes.length}
                </span>
              )}
              <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-dark-600 border border-white/10 rounded-lg text-slate-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Notes
              </span>
            </button>

            {/* Favourite button */}
            <button onClick={toggleFav}
              className={`group relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 border ${isFav ? 'bg-pink-500/20 border-pink-500/40 text-pink-400' : 'bg-white/5 border-white/8 text-slate-400 hover:bg-pink-500/10 hover:border-pink-500/20 hover:text-pink-400'} ${favAnim ? 'scale-125' : 'scale-100'}`}
              title={isFav ? 'Remove from Favourites' : 'Add to Favourites'}>
              <svg className={`w-5 h-5 transition-all duration-200 ${isFav ? 'fill-pink-400' : 'fill-none'}`} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
              </svg>
              <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-dark-600 border border-white/10 rounded-lg text-slate-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {isFav ? 'Favourited' : 'Favourite'}
              </span>
            </button>

            {/* Watch Later button */}
            <button onClick={toggleWatchLater}
              className={`group relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 border ${isWatchLater ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-white/5 border-white/8 text-slate-400 hover:bg-amber-500/10 hover:border-amber-500/20 hover:text-amber-400'} ${wlAnim ? 'scale-125' : 'scale-100'}`}
              title={isWatchLater ? 'Remove from Watch Later' : 'Save to Watch Later'}>
              <svg className="w-5 h-5" fill={isWatchLater ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-dark-600 border border-white/10 rounded-lg text-slate-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {isWatchLater ? 'Saved' : 'Watch Later'}
              </span>
            </button>

            {/* Share button */}
            <button onClick={() => navigator.clipboard?.writeText(window.location.href)}
              className="group relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 border bg-white/5 border-white/8 text-slate-400 hover:bg-white/10 hover:border-white/15 hover:text-white"
              title="Copy Link">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"/>
              </svg>
              <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-dark-600 border border-white/10 rounded-lg text-slate-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Copy Link
              </span>
            </button>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Video */}
            <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl shadow-black/60 glow-blue animate-fade-in">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1&autoplay=0`}
                  title={video.channelTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Mobile action bar */}
            <div className="flex lg:hidden items-center gap-2 mt-4">
              <button onClick={() => setNotesOpen(!notesOpen)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all ${notesOpen ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' : 'bg-white/5 border-white/8 text-slate-400'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
                </svg>
                Notes {savedNotes.length > 0 && `(${savedNotes.length})`}
              </button>
              <button onClick={toggleFav}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all ${isFav ? 'bg-pink-500/20 border-pink-500/40 text-pink-400' : 'bg-white/5 border-white/8 text-slate-400'}`}>
                <svg className={`w-4 h-4 ${isFav ? 'fill-pink-400' : 'fill-none'}`} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                </svg>
                {isFav ? 'Saved' : 'Favourite'}
              </button>
              <button onClick={toggleWatchLater}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all ${isWatchLater ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-white/5 border-white/8 text-slate-400'}`}>
                <svg className="w-4 h-4" fill={isWatchLater ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Later
              </button>
            </div>

            {/* Video info */}
            <div className="mt-4 glass-card rounded-2xl p-5 animate-slide-up">
              {category && (
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-sm">{category.icon}</span>
                  <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">{category.title}</span>
                </div>
              )}
              <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight" style={{fontFamily:'Syne,sans-serif'}}>{video.title}</h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
                  {video?.channelTitle?.[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300">{video.channel}</p>
                  <p className="text-xs text-slate-600">{video.views} views · {video.duration}</p>
                </div>
              </div>
            </div>

            {/* Focus mode badge */}
            <div className="mt-3 flex items-center gap-3 px-5 py-3 rounded-xl border border-emerald-500/15 bg-emerald-500/5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
              <p className="text-xs text-emerald-400 font-medium">Focus Mode — No ads, no distractions</p>
            </div>

            {/* Notes panel (inline when open) */}
            {notesOpen && (
              <div className="mt-4 glass-card rounded-2xl overflow-hidden border border-blue-500/15 animate-slide-up">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-white" style={{fontFamily:'Syne,sans-serif'}}>
                      Study Notes
                    </span>
                    {savedNotes.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">
                        {savedNotes.length}
                      </span>
                    )}
                  </div>
                  <button onClick={() => setNotesOpen(false)}
                    className="w-7 h-7 rounded-lg hover:bg-white/8 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>

                {/* Note input */}
                <div className="p-4">
                  <div className="relative">
                    <textarea
                      value={noteText}
                      onChange={e => setNoteText(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) saveNote(); }}
                      placeholder="Jot down your thoughts, key concepts, or questions... (Ctrl+Enter to save)"
                      rows={4}
                      className="w-full px-4 py-3 bg-dark-800/80 border border-white/8 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/40 resize-none transition-all duration-200 leading-relaxed"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-xs text-slate-600">{noteText.length}/500 chars</span>
                    <button onClick={saveNote}
                      disabled={!noteText.trim()}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition-all duration-200">
                      {noteSaved ? (
                        <>
                          <svg className="w-3.5 h-3.5 text-emerald-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                          </svg>
                          Saved!
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                          </svg>
                          Save Note
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Saved notes */}
                {savedNotes.length > 0 && (
                  <div className="border-t border-white/8 max-h-64 overflow-y-auto">
                    <div className="px-4 py-3">
                      <p className="text-xs text-slate-600 uppercase tracking-widest font-medium mb-3">Saved Notes</p>
                      <div className="space-y-2">
                        {[...savedNotes].reverse().map(note => (
                          <div key={note.id} className="group flex gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/5 border border-white/5 transition-all duration-200">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{note.text}</p>
                              <p className="text-xs text-slate-600 mt-1.5">{note.date} · {note.time}</p>
                            </div>
                            <button onClick={() => deleteNote(note.id)}
                              className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-lg hover:bg-red-500/20 flex items-center justify-center text-slate-600 hover:text-red-400 transition-all shrink-0 mt-0.5">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Related videos */}
            {related.length > 0 && (
              <div className="mt-10">
                <h2 className="text-lg font-bold text-white mb-5" style={{fontFamily:'Syne,sans-serif'}}>More in {category?.title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {related.map(v => (
                    <div key={v.id} onClick={() => navigate(`/watch/${v.id}`)}
                      className="group cursor-pointer rounded-xl overflow-hidden glass-card hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-video overflow-hidden bg-dark-700">
                        <img src={v.thumbnail} alt={v.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={e => { e.target.src = `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`; }}
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-medium text-slate-300 line-clamp-2 group-hover:text-blue-300 transition-colors">{v.title}</p>
                        <p className="text-xs text-slate-600 mt-1">{v.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
