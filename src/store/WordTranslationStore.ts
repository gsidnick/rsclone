import { makeAutoObservable } from 'mobx';
import IWord from '../interfaces/IWord';

class WordTranslationStore {
  public answers: (string | null | undefined)[] = [];
  private words: IWord[] = {} as IWord[];
  private correctAnswer: IWord | null = null;
  private firstWrongAnswer: IWord | null = null;
  private secondWrongAnswer: IWord | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public setWords(words: IWord[]) {
    this.words = words;
  }

  public setCorrectAnswer(answer: IWord) {
    this.correctAnswer = answer;
  }

  private setFirstAnswer(answer: IWord) {
    this.firstWrongAnswer = answer;
  }

  private setSecondAnswer(answer: IWord) {
    this.secondWrongAnswer = answer;
  }

  private setAnswers(arr: (string | null | undefined)[]) {
    this.answers = arr;
  }

  public randomAnswers() {
    if (this.words.length < 3) {
      this.setAnswers([]);
    } else {
      let randomWords = this.words.filter((el) => el.word !== this.correctAnswer?.word);
      let randomIndex = Math.floor(Math.random() * randomWords.length);

      this.setFirstAnswer(randomWords[randomIndex]);

      randomIndex = Math.floor(Math.random() * randomWords.length);

      this.setSecondAnswer(randomWords[randomIndex]);

      const checkDuplicate = () => {
        if (this.firstWrongAnswer === this.secondWrongAnswer) {
          randomIndex = Math.floor(Math.random() * randomWords.length);

          this.setSecondAnswer(randomWords[randomIndex]);

          checkDuplicate();
        }
      };

      checkDuplicate();
      this.createArr();
    }
  }

  private createArr() {
    let newArr: (string | null | undefined)[] = [];
    newArr.push(
      this.firstWrongAnswer?.translation,
      this.secondWrongAnswer?.translation,
      this.correctAnswer?.translation,
    );

    for (let i = newArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }

    this.setAnswers(newArr);
  }
}

export default WordTranslationStore;
