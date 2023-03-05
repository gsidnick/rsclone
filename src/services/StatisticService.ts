import api from '../api/api';
import { AxiosResponse } from 'axios';
import IStatistic from '../interfaces/IStatistic';

class StatisticService {
  public async getStatistic(): Promise<AxiosResponse<IStatistic>> {
    return api.get<IStatistic>('/statistic');
  }

  public async setStatistic(score: number, level: number): Promise<AxiosResponse<IStatistic>> {
    return api.put<IStatistic>('/statistic', { score, level });
  }
}

export default StatisticService;
