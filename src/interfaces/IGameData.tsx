export default interface IGameData {
  functions:{
    addCorrect: () => void, 
    addError:() => void, 
    shuffleGameNames: () => [{word:string, translate:string, learn:string}]};
}
