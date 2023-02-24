import { makeAutoObservable } from 'mobx';
import WordService from '../services/WordService';
import IWord from '../interfaces/IWord';

const wordService = new WordService();

class WordStore {
  public isLoading: boolean = true;
  public words: IWord[] = [] as IWord[];

  constructor() {
    makeAutoObservable(this);
  }

  public setIsLoading(bool: boolean) {
    this.isLoading = bool;
  }

  private setWord(word: IWord) {
    this.words.push(word);
  }

  private unsetWord(id: string) {
    this.words = this.words.filter((item) => id !== item._id);
  }

  public async fetchWords(): Promise<void> {
    try {
      this.setIsLoading(true);
      const response = await wordService.getAllWords();
      this.words = response.data;
      this.setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  public async addWord(word: string): Promise<void> {
    try {
      this.setIsLoading(true);
      word = word.toLowerCase();
      const duplicate = this.words.find((item) => word === item.word);
      if (duplicate) {
        console.log(`${word} is already exist in library`);
        this.setIsLoading(false);
        return;
      }
      const response = await wordService.addWord(word);
      this.setWord(response.data);
      this.setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  public async removeWord(word: string): Promise<void> {
    try {
      this.setIsLoading(true);
      const response = await wordService.removeWord(word);
      this.unsetWord(response.data._id);
      this.setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
}
export default WordStore;
