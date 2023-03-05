import { makeAutoObservable } from 'mobx';
import React from 'react';

class ModalStore {
  public isModalOpen: boolean = false;
  public body: React.ReactElement | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private setIsModalOpen(bool: boolean) {
    this.isModalOpen = bool;
  }

  public openModal(body: React.ReactElement) {
    this.isModalOpen = true;
    this.body = null;
    this.body = body;
  }

  public closeModal() {
    return new Promise((resolve) => {
      this.setIsModalOpen(false);
      setTimeout(() => {
        resolve(true);
      }, 200);
    });
  }
}

export default ModalStore;
