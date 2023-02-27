import React from 'react';
import { IButtonProps } from '../../../interfaces/IButtonProps';
import './Button.css';
import { Link } from 'react-router-dom';

function Button({ className, children, onClick, to, disabled, type }: IButtonProps) {
  const classnames = className ? `button ${className}` : 'button';
  if (type === undefined) type = 'button';
  return (
    <>
      {to !== undefined ? (
        <Link className={classnames} onClick={onClick} to={to}>
          {children}
        </Link>
      ) : (
        <button className={classnames} onClick={onClick} type={type} disabled={disabled}>
          {children}
        </button>
      )}
    </>
  );
}

export default Button;
