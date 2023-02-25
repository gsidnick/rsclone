import { makeAutoObservable } from 'mobx';
import React from 'react';

class ModalStore {
  public isModal: boolean = false;
  public body: React.ReactElement | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private setIsModal(bool: boolean) {
    this.isModal = bool;
  }

  public openModal(body: React.ReactElement) {
    this.isModal = true;
    this.body = null;
    this.body = body;
  }

  public closeModal() {
    return new Promise((resolve) => {
      this.setIsModal(false);
      setTimeout(() => {
        resolve(true);
      }, 200);
    });
  }
}

export default ModalStore;
