import IWord from "./IWord";

export default interface IGameData {
  functions:{
    addCorrect: () => void, 
    addError:() => void, 
    shuffleGameNames: () => IWord[];
}
}
