import './Input.css';
import React, { ForwardedRef } from 'react';
import { observer } from 'mobx-react-lite';
import { IInputProps } from '../../../interfaces/IInputProps';

function Input(
  { className, name, type, placeholder, value, onChange, onKeyDown, onBlur }: IInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  let classnames = className ? `input ${className}` : 'input input_invalid';

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
        <span className="tooltip">error.message error.message error.message error.message</span>
      </span>
    </label>
  );
}

export default observer(React.forwardRef(Input));
