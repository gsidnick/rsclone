import { makeAutoObservable } from 'mobx';

class WordCharsStore {
  public word: string[] | null = null;
  public shuffleWord: string[] | null = null;
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
		const charsTmp: Array<string> = [];

		while(true) {
			if (charsTmp.length === this.word?.length) break;

      if (this.word !== null) {
        const index = Math.floor(Math.random() * this.word.length);
        const char = this.word[index];

        if (!charsTmp.includes(char)) charsTmp.push(char);
      }
		}

		this.shuffleWord = charsTmp;
  }

  private remoweShuffleWord(char: string) {
    if (this.shuffleWord !== null) {
      this.shuffleWord = this.shuffleWord.filter(item => char !== item);
    }
  }

  private addCurrentWord(char: string) {
    this.currentWord.push(char);
  }

  public check(char: string) {
    this.remoweShuffleWord(char);
    this.addCurrentWord(char);
    if (this.currentWord.length === this.word?.length) {
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

  private cleanCurrentWord() {
    this.currentWord = [];
  }
}

export default WordCharsStore;