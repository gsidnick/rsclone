import { makeAutoObservable } from 'mobx';
import WordService from '../services/WordService';
import IWord from '../interfaces/IWord';

const wordService = new WordService();

class WordStore {
  public isLoad: boolean = true;
  public words: IWord[] = [] as IWord[];
  public currentWord: IWord = {} as IWord;
  private index: number = 0;

  constructor() {
    makeAutoObservable(this);
    this.fetchWords();
  }

  public setIsLoad(bool: boolean) {
    this.isLoad = bool;
  }

  public setWords(words: IWord[]) {
    this.words = words;
    this.currentWord = this.words[this.index];
  }

  private setWord(word: IWord) {
    this.words.push(word);
  }

  private unsetWord(id: string) {
    this.words = this.words.filter((item) => id !== item._id);
  }

  public prevWord() {
    const index = this.index - 1;
    if (index !== -1) {
      this.currentWord = this.words[index];
      this.index = index;
    }
  }

  public nextWord() {
    const index = this.index + 1;
    if (this.words[index] !== undefined) {
      this.currentWord = this.words[index];
      this.index = index;
    }
  }

  public resetWord() {
    this.index = 0;
    this.currentWord = this.words[this.index];
  }

  public setProgress() {
    return ((this.index + 1) * 100) / this.words.length;
  }

  public async fetchWords(): Promise<void> {
    try {
      this.setIsLoad(true);
      const response = await wordService.getAllWords();
      this.setWords(response.data);
      this.setIsLoad(false);
    } catch (error) {
      console.error(error);
    }
  }

  public async addWord(word: string): Promise<void> {
    try {
      word = word.toLowerCase();
      const duplicate = this.words.find((item) => word === item.word);
      if (duplicate) return;
      const response = await wordService.addWord(word);
      this.setWord(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  public async removeWord(word: string): Promise<void> {
    try {
      const response = await wordService.removeWord(word);
      this.unsetWord(response.data._id);
    } catch (error) {
      console.error(error);
    }
  }
}
export default WordStore;
