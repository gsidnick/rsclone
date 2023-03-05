import React from 'react';
import IAuthProps from '../../interfaces/IAuthProps';
import './Auth.css';

function Auth({ children }: IAuthProps) {
  return (
    <main className="auth">
      <div className="auth__container container">{children}</div>
    </main>
  );
}

export default Auth;
