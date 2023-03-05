import AuthStore from './AuthStore';
import StatisticStore from './StatisticStore';
import WordStore from './WordStore';
import GameStore from './GameStore';
import ModalStore from './ModalStore';
import ThemeStore from './ThemeStore';

class RootStore {
  public authStore: AuthStore;
  public statisticStore: StatisticStore;
  public wordStore: WordStore;
  public gameStore: GameStore;
  public modalStore: ModalStore;
  public themeStore: ThemeStore;

  constructor() {
    this.authStore = new AuthStore();
    this.statisticStore = new StatisticStore();
    this.wordStore = new WordStore();
    this.gameStore = new GameStore();
    this.modalStore = new ModalStore();
    this.themeStore = new ThemeStore();
  }
}

export default RootStore;
