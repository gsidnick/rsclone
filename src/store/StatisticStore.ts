import { makeAutoObservable } from 'mobx';
import StatisticService from '../services/StatisticService';

const statisticService = new StatisticService();

class StatisticStore {
  public isLoading: boolean = true;
  public score: number = 0;
  public level: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  public setIsLoading(bool: boolean) {
    this.isLoading = bool;
  }

  public setScore(score: number) {
    this.score = score;
  }

  private setLevel(level: number) {
    this.level = level;
  }

  public async fetchStatistic(): Promise<void> {
    try {
      this.setIsLoading(true);
      const response = await statisticService.getStatistic();
      this.setScore(response.data.score);
      this.setLevel(response.data.level);
      this.setIsLoading(false);
    } catch (error) {
      console.error(error);
      this.setIsLoading(false);
    }
  }

  public async updateStatistic(): Promise<void> {
    try {
      this.setIsLoading(true);
      await statisticService.setStatistic(this.score, this.level);
      this.setIsLoading(false);
    } catch (error) {
      console.error(error);
      this.setIsLoading(false);
    }
  }
}

export default StatisticStore;
