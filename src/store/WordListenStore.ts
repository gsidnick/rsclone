/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeAutoObservable } from 'mobx';
import IWord from '../interfaces/IWord';
import useStores from '../hooks/useStores';

class WordListenStore {
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

  public randomWord() {
    const isRandomed = Math.floor(Math.random() * 2);
    if (isRandomed === 1) {
      const randomWords = this.words.filter((el) => el.word !== this.question?.word)
      const randomIndex = Math.floor(Math.random() * randomWords.length)
      this.setAnswer(randomWords[randomIndex].translation);
      this.setIsCorrect(false);
    } else {
      if (this.question !== null) {
        this.setAnswer(this.question.translation);
        this.setIsCorrect(true);
      }
    }
  }

  public wiretap() {
    const msg = new SpeechSynthesisUtterance();
    msg.lang = 'en-EN';
    msg.text = (this.answer as string);
    window.speechSynthesis.speak(msg);
  }
}

export default WordListenStore;
