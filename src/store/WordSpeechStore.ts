import { makeAutoObservable } from 'mobx';

class WordSpeechStore {
  public word: string = '';
  public question: string | null = null;
  public answer: string | null = null;
  public isSpeeching: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public setWord(word: string) {
    this.word = word;
  }

  public setQuestion(question: string) {
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

  public setSpeech(bool: boolean) {
    this.isSpeeching = bool;
  }

  public recognizeSpeech() {
    const SpeechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    SpeechRecognition.lang = 'en-EN';
    SpeechRecognition.onresult = (event: { results: { transcript: string }[][] }) => {
      let word = event.results[0][0].transcript.toLowerCase();
      this.setAnswer(word);
    };
    SpeechRecognition.onaudiostart = () => {
      this.setSpeech(true);
    };
    SpeechRecognition.onaudioend = () => {
      this.setSpeech(false);
    };
    SpeechRecognition.start();
  }

  public compareWords(): boolean | undefined {
    const word = this.word;
    const answer = this.answer;
    if (word !== null && answer !== null) {
      return word === answer;
    }
  }

  public cleanAnswer() {
    this.answer = null;
  }
}

export default WordSpeechStore;
