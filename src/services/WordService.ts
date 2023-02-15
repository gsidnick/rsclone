import api from '../api/api';
import { AxiosResponse } from 'axios';
import IWord from '../interfaces/IWord';

class WordService {
  public async getAllWords(): Promise<AxiosResponse<IWord[]>> {
    return api.get<IWord[]>('/words');
  }

  public async addWord(word: string): Promise<AxiosResponse<IWord>> {
    return api.post<IWord>('/word', { word });
  }

  public async removeWord(id: string): Promise<AxiosResponse<IWord>> {
    return api.delete<IWord>(`/word/${id}`);
  }
}

export default WordService;
