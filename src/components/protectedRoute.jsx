import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [authed,   setAuthed]   = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(!!session);
      setChecking(false);
    });
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--light)' }}>
        <div className="w-8 h-8 rounded-full border-2 border-[#E2D9F3] animate-spin"
          style={{ borderTopColor: '#7C3AED' }} />
      </div>
    );
  }

  return authed ? children : <Navigate to="/admin" replace />;
}