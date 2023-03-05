import api from '../api/api';
import { AxiosResponse } from 'axios';
import IAuthResponse from '../interfaces/IAuthResponse';

class AuthService {
  public async signup(name: string, email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return api.post<IAuthResponse>('/signup', { name, email, password });
  }

  public async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return api.post<IAuthResponse>('/login', { email, password });
  }

  public async logout(): Promise<void> {
    return api.post('/logout');
  }
}

export default AuthService;
