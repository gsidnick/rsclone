import { makeAutoObservable } from 'mobx';

class ModalStore {
  public isModal: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public openModal() {
    this.isModal = true;
  }

  public closeModal() {
    this.isModal = false;
  }
}

export default ModalStore;
