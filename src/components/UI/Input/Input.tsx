import React from 'react';
import { IInputProps } from '../../../interfaces/IInputProps';
import './Input.css';

function Input({ className, name, type, placeholder, value, onChange, onKeyDown }: IInputProps) {
  const classnames = className ? `input ${className}` : 'input';
  return (
    <input
      className={classnames}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

export default Input;
