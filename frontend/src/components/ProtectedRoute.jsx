import { Navigate } from 'react-router-dom';

// Basic ProtectedRoute — checks localStorage for auth token
export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('ss_auth_token');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
