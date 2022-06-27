import { Auth } from '@supabase/ui';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { supabase } from '../lib/initSupabase';

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json());

const Login = () => {
  const { user, session } = Auth.useUser();
  const { data, error } = useSWR(
    session ? ['/api/getUser', session.access_token] : null,
    fetcher
  );

  const [authView, setAuthView] = useState('sign_in');

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY') setAuthView('update_password');
        if (event === 'USER_UPDATED')
          setTimeout(() => setAuthView('sign_in'), 1000);

        // Send session to /api/auth route to set the auth cookie
        fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json());
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <div className="h-screen justify-center flex w-full">
      {authView === 'update_password' && (
        <Auth.UpdatePassword supabaseClient={supabase} />
      )}
      {!user && (
        <div className="w-3/5">
          <h1>Sign In</h1>
          <Auth
            supabaseClient={supabase}
            providers={['google', 'github']}
            view={authView}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </div>
      )}
    </div>
  );
};

export default Login;
