import { makeAutoObservable } from 'mobx';
import React from 'react';

class ModalStore {
  public isModal: boolean = false;
  public body: React.ReactElement | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public openModal(body: React.ReactElement) {
    this.isModal = true;
    this.body = null;
    this.body = body;
  }

  public closeModal() {
    this.isModal = false;
  }
}

export default ModalStore;
