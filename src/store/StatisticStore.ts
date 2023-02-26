import { makeAutoObservable } from 'mobx';
import StatisticService from '../services/StatisticService';

const statisticService = new StatisticService();

class StatisticStore {
  public isLoading: boolean = true;
  public score: number = 0;
  public level: number = 1;
  private breakpoints = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  constructor() {
    makeAutoObservable(this);
  }

  public setIsLoading(bool: boolean) {
    this.isLoading = bool;
  }

  public setScore(score: number) {
    this.score = score;
    this.updateLevel();
  }

  private setLevel(level: number) {
    this.level = level;
  }

  private updateLevel() {
    let level: number = 1;
    this.breakpoints.forEach((bp, i) => {
      if (this.score >= bp) level = i + 2;
    });
    if (this.level < level) {
      this.setLevel(level);
      this.updateStatistic();
    }
  }

  public async fetchStatistic(): Promise<void> {
    try {
      this.setIsLoading(true);
      const response = await statisticService.getStatistic();
      this.setLevel(response.data.level);
      this.setScore(response.data.score);
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
