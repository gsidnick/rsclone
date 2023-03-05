export default interface IWord {
  _id: string;
  word: string;
  translation: string;
  learn: number;
  user?: string;
}
