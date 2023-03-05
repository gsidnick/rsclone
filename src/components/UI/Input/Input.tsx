import './Input.css';
import React, { ForwardedRef } from 'react';
import { IInputProps } from '../../../interfaces/IInputProps';

function Input(
  { className, name, type, placeholder, value, error, errorText, onChange, onKeyDown, onBlur }: IInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  let classnames = className ? `input ${className}` : 'input';
  if (error) classnames = `${classnames} input_invalid`;
  return (
    <label className={classnames}>
      <input
        className="input__field"
        name={name}
        type={type}
        value={value}
        ref={ref}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
      <span className="input__error">
        <span className="tooltip">{errorText}</span>
      </span>
    </label>
  );
}

export default React.forwardRef(Input);
