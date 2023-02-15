import IUser from './IUser';

export default interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
