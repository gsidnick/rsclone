import './Modal.css';
import React from 'react';
import IModalProps from '../../interfaces/IModalProps';
import useStores from '../../hooks/useStores';

function Modal({ className }: IModalProps) {
  const { modalStore } = useStores();
  let classnames = className ? `modal ${className}` : 'modal';
  return (
    <div className={classnames}>
      <div className="modal__container">{modalStore.body}</div>
    </div>
  );
}

export default Modal;
