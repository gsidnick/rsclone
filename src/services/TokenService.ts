const ACCESS_TOKEN_NAME = 'accessToken';
const REFRESH_TOKEN_NAME = 'refreshToken';

class TokenService {
  public setAccessToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN_NAME, token);
  }
  public removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
  }
  public setRefreshToken(token: string) {
    document.cookie = `${REFRESH_TOKEN_NAME}=${token}; Path=/; Max-Age=864000;`;
  }
  public removeRefreshToken() {
    document.cookie = `${REFRESH_TOKEN_NAME}=''; Path=/; Max-Age=-1;`;
  }
}

export default TokenService;
