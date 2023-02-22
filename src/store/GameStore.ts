import { makeAutoObservable } from 'mobx';
import { GameFunctionalComponent } from '../types/GameFunctionalComponent';
import Game1 from '../components/Games/Game1/Game1';
import Game2 from '../components/Games/Game2/Game2';
import Game3 from '../components/Games/Game3/Game3';
import Game4 from '../components/Games/Game4/Game4';
import Game5 from '../components/Games/Game5/Game5';
import Game6 from '../components/Games/Game6/Game6';

class GameStore {
  public correct: number = 0;
  public wrong: number = 0;
  private games: Array<GameFunctionalComponent> = [Game1, Game2, Game3, Game4, Game5, Game6];

  constructor() {
    makeAutoObservable(this);
  }

  public loadGame(number: number): GameFunctionalComponent | undefined {
    const index = number - 1;
    if (index >= 0 && index < this.games.length) {
      return this.games[number - 1];
    }
  }

  public setCorrect() {
    this.correct = this.correct + 1;
  }

  public setWrong() {
    this.wrong = this.wrong + 1;
  }
}
export default GameStore;
