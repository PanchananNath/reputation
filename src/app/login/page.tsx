// pages/signin.tsx
"use client";
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useData } from '@/providers/dataprovider';

const SignIn = () => {
    const {userid, setUserid} = useData();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const res = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
        // store the user id in local storage
        const data = await res.json();
        console.log('userid', data.id);
        setUserid(data.id);
        
      window.location.href = '/'; // Redirect to home page after successful sign in
    } else {
      const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        {error && <p>{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
