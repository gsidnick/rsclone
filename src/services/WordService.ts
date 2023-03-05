import api from '../api/api';
import { AxiosResponse } from 'axios';
import IWord from '../interfaces/IWord';

class WordService {
  public async getAllWords(): Promise<AxiosResponse<IWord[]>> {
    return api.get<IWord[]>('/words');
  }

  public async addWord(word: string): Promise<AxiosResponse<IWord>> {
    const response = await fetch(`${process.env.REACT_APP_TRANSLATE_URL}${word}`);
    const data = await response.json();
    const translation = data.translate;
    return api.post<IWord>('/word', { word, translation });
  }

  public async removeWord(id: string): Promise<AxiosResponse<IWord>> {
    return api.delete<IWord>(`/word/${id}`);
  }
}

export default WordService;
