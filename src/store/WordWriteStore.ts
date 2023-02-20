import { makeAutoObservable } from 'mobx';
import IWord from '../interfaces/IWord';

class WordWriteStore {
  public question: IWord | null = null; // WordRu
  private words: IWord[] = {} as IWord[];
  private answer: string | null = null; // WordEng 
  public isCorrect: boolean = false; // Проверка

  constructor() {
    makeAutoObservable(this);
  }

  public setWords(words: IWord[]) {
    this.words = words;
  }

  public setQuestion(question: IWord) {
    this.question = question;
  }

  public resetQuestion() {
    this.question = null;
  }

  public setAnswer(answer: string) {
    this.answer = answer;
  }

  public resetAnswer() {
    this.answer = null;
  }

  public setIsCorrect(bool: boolean) {
    this.isCorrect = bool;
  }
}

export default WordWriteStore;
