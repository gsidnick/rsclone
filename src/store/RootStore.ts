import AuthStore from './AuthStore';
import WordStore from './WordStore';
import GameStore from './GameStore';
import ModalStore from './ModalStore';

class RootStore {
  public authStore: AuthStore;
  public wordStore: WordStore;
  public gameStore: GameStore;
  public modalStore: ModalStore;

  constructor() {
    this.authStore = new AuthStore();
    this.wordStore = new WordStore();
    this.gameStore = new GameStore();
    this.modalStore = new ModalStore();
  }
}

export default RootStore;
