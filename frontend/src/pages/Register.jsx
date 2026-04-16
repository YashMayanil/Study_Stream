import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { useToast } from '../components/Toast';

export default function Register() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);

      const res = await registerUser({
        username: form.username,
        email: form.email,
        password: form.password
      });

      // 🎉 Success toast
      showToast({
        type: 'success',
        title: `Account created! Welcome, ${res.data.user.username} 🚀`,
        message: 'Start exploring curated videos and learning without distractions.',
        duration: 5000,
      });

      // Notify Navbar in same tab to re-read localStorage
      window.dispatchEvent(new Event('userUpdated'));

      navigate("/");

    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Registration failed. Please try again.";
      setError(msg);
      showToast({ type: 'error', title: 'Registration failed', message: msg });
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'username', label: 'Username', type: 'text', placeholder: 'your_username' },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
    { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/5 blur-3xl rounded-full" />
      </div>

      <div className="w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              Study<span className="text-blue-400">Stream</span>
            </span>
          </Link>
          <p className="text-slate-500 text-sm mt-3">Start your learning journey today.</p>
        </div>

        <div className="glass-card rounded-2xl p-8 shadow-2xl shadow-black/40">
          <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                {error}
              </div>
            )}

            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-0.5">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 bg-dark-700 border border-white/8 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-dark-600 transition-all duration-200"
                />
              </div>
            ))}

            {/* Password strength */}
            {form.password.length > 0 && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        form.password.length >= i * 3
                          ? form.password.length >= 10 ? 'bg-emerald-500' : form.password.length >= 6 ? 'bg-amber-500' : 'bg-red-500'
                          : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-600">
                  {form.password.length < 6 ? 'Too short' : form.password.length < 10 ? 'Moderate' : 'Strong'} password
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : 'Create Free Account'}
            </button>
          </form>

          <p className="text-xs text-slate-600 text-center mt-5">
            By registering, you agree to our{' '}
            <span className="text-slate-500 hover:text-slate-400 cursor-pointer transition-colors">Terms</span>
            {' '}and{' '}
            <span className="text-slate-500 hover:text-slate-400 cursor-pointer transition-colors">Privacy Policy</span>
          </p>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
