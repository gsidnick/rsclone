import { makeAutoObservable } from 'mobx';
import IWord from '../interfaces/IWord';

class WordTranslationStore {
  public correctAnswer: IWord | null = null; // WordRu
  public firstAnswer: IWord | null = null; // WordEng 
  public secondAnswer: IWord | null = null; // WordEng
  public answersArr: (string | null | undefined)[] = [];

  private words: IWord[] = {} as IWord[];
  public isCorrect: boolean = false; // Проверка
  public current: IWord = {} as IWord;
  private index: number = 0;

  constructor() {
    makeAutoObservable(this);
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
    if (index === this.words.length){
      this.index = 0;
    }
  }

  public setWords(words: IWord[]) {
    this.words = words;
    this.current = this.words[this.index];
  }

  public setFirstAnswer(answer: IWord) {
    this.firstAnswer = answer;
  }

  public setSecondAnswer(answer: IWord) {
    this.secondAnswer = answer;
  }

  public setAnswersArr(arr : (string | null | undefined)[]) {
    this.answersArr = arr;
  }

  public setQuestion(question: IWord) {
    this.correctAnswer = question;
    this.randomAnswers();
  }

  public resetQuestion() {
    this.correctAnswer = null;
  }

  public setIsCorrect(bool: boolean) {
    this.isCorrect = bool;
  }

  public randomAnswers() {
    if (this.words.length < 3){
      this.setAnswersArr([]);
    } else {
    let randomWords = this.words.filter((el) => el.word !== this.current.word);
    let randomIndex = Math.floor(Math.random() * randomWords.length);

    this.setFirstAnswer(randomWords[randomIndex]);

    randomIndex = Math.floor(Math.random() * randomWords.length);

    this.setSecondAnswer(randomWords[randomIndex]);

    const checkDuplicate = () => {   
      if(this.firstAnswer === this.secondAnswer){
        randomIndex = Math.floor(Math.random() * randomWords.length);

        this.setSecondAnswer(randomWords[randomIndex]);

        checkDuplicate();
      }
    };

    checkDuplicate();
    this.createArr ();
    }
  }

  public createArr () {
    let newArr:(string | null | undefined)[] = [];
    newArr.push(this.firstAnswer?.word, this.secondAnswer?.word, this.current?.word);

    for (let i = newArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }

    this.setAnswersArr(newArr);
  }
  

}

export default WordTranslationStore;
