import { makeAutoObservable } from 'mobx';
import IStatistic from '../interfaces/IStatistic';
import StatisticService from '../services/StatisticService';

const statisticService = new StatisticService();

class StatisticStore {
  public isLoading: boolean = true;
  public statistic: IStatistic = {} as IStatistic;

  constructor() {
    makeAutoObservable(this);
  }

  public setIsLoading(bool: boolean) {
    this.isLoading = bool;
  }

  public setStatistic(statistic: IStatistic) {
    this.statistic = statistic;
  }

  public setScore(score: number) {
    this.statistic.score = score;
  }

  public setLevel(level: number) {
    this.statistic.level = level;
  }

  public async fetchStatistic(): Promise<void> {
    try {
      this.setIsLoading(true);
      const response = await statisticService.getStatistic();
      this.setStatistic(response.data);
      this.setIsLoading(false);
    } catch (error) {
      console.error(error);
      this.setIsLoading(false);
    }
  }

  public async updateStatistic(): Promise<void> {
    try {
      this.setIsLoading(true);
      const { score, level } = this.statistic;
      const response = await statisticService.setStatistic(score, level);
      this.setStatistic(response.data);
      this.setIsLoading(false);
    } catch (error) {
      console.error(error);
      this.setIsLoading(false);
    }
  }
}

export default StatisticStore;
