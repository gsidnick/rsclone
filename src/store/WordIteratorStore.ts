import IWord from '../interfaces/IWord';
import { makeAutoObservable } from 'mobx';

class WordIteratorStore {
  public words: IWord[] = {} as IWord[];
  public current: IWord = {} as IWord;
  public isEnd: boolean = false;
  private index: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  public setWords(words: IWord[]) {
    this.words = words;
    this.current = this.words[this.index];
  }

  public prevWord() {
    const index = this.index - 1;
    if (index !== -1) {
      this.current = this.words[index];
      this.index = index;
    }
  }

  public nextWord() {
    const index = this.index + 1;
    if (this.words[index] !== undefined) {
      this.current = this.words[index];
      this.index = index;
    }
  }

  public setProgress() {
    return ((this.index + 1) * 100) / this.words.length;
  }
}

export default WordIteratorStore;
