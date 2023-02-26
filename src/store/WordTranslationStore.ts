import { makeAutoObservable } from 'mobx';
import IWord from '../interfaces/IWord';

enum Locale {
  RU = 'ru',
  EN = 'en',
}

class WordTranslationStore {
  public answers: (string | null | undefined)[] = [];
  private words: IWord[] = {} as IWord[];
  private correctAnswer: IWord | null = null;
  private firstWrongAnswer: IWord | null = null;
  private secondWrongAnswer: IWord | null = null;
  private lang: string = Locale.EN;

  constructor(lang: string) {
    makeAutoObservable(this);
    this.lang = lang;
  }

  public setWords(words: IWord[]) {
    this.words = words;
  }

  public setCorrectAnswer(answer: IWord) {
    this.correctAnswer = answer;
    this.randomAnswers();
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

  private randomAnswers() {
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
    let answers: (string | null | undefined)[] = [];

    if (this.lang === Locale.EN) {
      answers.push(
        this.firstWrongAnswer?.translation,
        this.secondWrongAnswer?.translation,
        this.correctAnswer?.translation,
      );
    }

    if (this.lang === Locale.RU) {
      answers.push(this.firstWrongAnswer?.word, this.secondWrongAnswer?.word, this.correctAnswer?.word);
    }

    for (let i = answers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    this.setAnswers(answers);
  }
}

export default WordTranslationStore;
