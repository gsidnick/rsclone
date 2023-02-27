import { makeAutoObservable } from 'mobx';
import IUser from '../interfaces/IUser';
import AuthService from '../services/AuthService';
import axios from 'axios';
import IAuthResponse from '../interfaces/IAuthResponse';
import TokenService from '../services/TokenService';

const authService = new AuthService();
const tokenService = new TokenService();
const SERVER_URL = process.env.REACT_APP_RAILWAY_URL;

class AuthStore {
  public user: IUser = {} as IUser;
  public isAuth: boolean = false;
  public isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public setUser(user: IUser) {
    this.user = user;
  }

  public setIsAuth(state: boolean) {
    this.isAuth = state;
  }

  public setIsLoading(state: boolean) {
    this.isLoading = state;
  }

  public async signup(name: string, email: string, password: string): Promise<void> {
    try {
      this.setIsLoading(true);
      const response = await authService.signup(name, email, password);
      tokenService.setAccessToken(response.data.accessToken);
      tokenService.setRefreshToken(response.data.refreshToken);
      this.setUser(response.data.user);
      this.setIsAuth(true);
      this.setIsLoading(false);
    } catch (error) {
      console.error(error);
      this.setIsLoading(false);
    }
  }

  public async login(email: string, password: string): Promise<void> {
    try {
      this.setIsLoading(true);
      const response = await authService.login(email, password);
      tokenService.setAccessToken(response.data.accessToken);
      tokenService.setRefreshToken(response.data.refreshToken);
      this.setUser(response.data.user);
      this.setIsAuth(true);
      this.setIsLoading(false);
    } catch (error) {
      console.error(error);
      this.setIsLoading(false);
    }
  }

  public async logout(): Promise<void> {
    try {
      this.setIsLoading(true);
      await authService.logout();
      tokenService.removeAccessToken();
      tokenService.removeRefreshToken();
      this.setUser({} as IUser);
      this.setIsAuth(false);
      this.setIsLoading(false);
    } catch (error) {
      console.error(error);
      this.setIsLoading(false);
    }
  }

  public async verifyAuth(): Promise<void> {
    try {
      this.setIsLoading(true);
      const response = await axios.get<IAuthResponse>(`${SERVER_URL}/api/refresh`, {
        withCredentials: true,
      });
      tokenService.setAccessToken(response.data.accessToken);
      tokenService.setRefreshToken(response.data.refreshToken);
      this.setUser(response.data.user);
      this.setIsAuth(true);
      this.setIsLoading(false);
    } catch (error) {
      console.error(error);
      this.setIsLoading(false);
    }
  }
}
export default AuthStore;
