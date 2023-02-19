import './Modal.css';
import React from 'react';
import IModalProps from '../../interfaces/IModalProps';

function Modal({ children }: IModalProps) {
  return <div className="modal">{children}</div>;
}

export default Modal;
