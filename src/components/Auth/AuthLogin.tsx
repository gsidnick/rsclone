import React, { useState } from 'react';
import Auth from './Auth';

function AuthLogin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <Auth>
      <div className="auth__form">
        <h1 className="auth__heading">Log In</h1>
        <input
          className="auth__input"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className="auth__input"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button className="auth__button" type="button">
          Log In
        </button>
      </div>
    </Auth>
  );
}

export default AuthLogin;
