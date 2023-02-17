import AuthStore from './AuthStore';
import WordStore from './WordStore';
import GameStore from './GameStore';

class RootStore {
  public authStore: AuthStore;
  public wordStore: WordStore;
  public gameStore: GameStore;

  constructor() {
    this.authStore = new AuthStore();
    this.wordStore = new WordStore();
    this.gameStore = new GameStore();
  }
}

export default RootStore;
