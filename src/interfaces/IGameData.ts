import ILibrary from "./ILibrary";

export default interface IGameData {
  functions:{
    addCorrect: () => void, 
    addError:() => void, 
    shuffleGameNames: () => ILibrary[];
}
}
