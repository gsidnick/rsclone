import { makeAutoObservable } from 'mobx';

class WordCharsStore {
  public word: string[] = [];
  public shuffleWord: string[] = [];
  public currentWord: string[] = [];
  public isCorrect: boolean = false;
  public notIsCorrect: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public changeIsCorrectToFalse() {
    this.isCorrect = false;
  }

  public changeNotIsCorrectToFalse() {
    this.notIsCorrect = false;
  }

  public setWord(word: string) {
    this.word = word.split('');
  }

  public setShuffleWord() {
    const wordTmp = [...this.word];
    wordTmp.sort(() => 0.5 - Math.random());
    this.shuffleWord = wordTmp;
  }

  private remoweShuffleWord(index: number) {
    this.shuffleWord.splice(index, 1);
  }

  private addCurrentWord(char: string) {
    this.currentWord.push(char);
  }

  public check(index: number) {
    this.addCurrentWord(this.shuffleWord[index]);
    this.remoweShuffleWord(index);
    if (this.currentWord.length === this.word.length) {
      const currentWord = this.currentWord.join('');
      const word = this.word.join('');
      if (currentWord === word) {
        this.isCorrect = true;
        this.cleanCurrentWord();
      } else {
        this.notIsCorrect = true;
        this.cleanCurrentWord();
      }
    }
  }

  public cleanCurrentWord() {
    this.word = [];
    this.currentWord = [];
  }
}

export default WordCharsStore;
