import { makeAutoObservable } from 'mobx';
import IUser from '../interfaces/IUser';
import AuthService from '../services/AuthService';
import axios from 'axios';

const authService = new AuthService();

class AuthStore {
  public user: IUser = {} as IUser;
  public isAuth: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public setUser(user: IUser) {
    this.user = user;
  }

  public setIsAuth(state: boolean) {
    this.isAuth = state;
  }

  public async signup(name: string, email: string, password: string): Promise<void> {
    try {
      const response = await authService.signup(name, email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setUser(response.data.user);
      this.setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  }

  public async login(email: string, password: string): Promise<void> {
    try {
      const response = await authService.login(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setUser(response.data.user);
      this.setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  }

  public async logout(): Promise<void> {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      this.setUser({} as IUser);
      this.setIsAuth(false);
    } catch (error) {
      console.error(error);
    }
  }

  public async verifyAuth(): Promise<void> {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/refresh`, { withCredentials: true });
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setUser(response.data.user);
      this.setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  }
}
export default AuthStore;
