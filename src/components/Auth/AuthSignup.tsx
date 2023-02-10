import React, { useState } from 'react';
import Auth from './Auth';

function AuthSignup() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <Auth>
      <div className="auth__form">
        <h1 className="auth__heading">Sign Up</h1>
        <input
          className="auth__input"
          onChange={(event) => setName(event.target.value)}
          value={name}
          type="text"
          name="name"
          placeholder="Name"
        />
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
          Sign Up
        </button>
      </div>
    </Auth>
  );
}

export default AuthSignup;
