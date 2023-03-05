import { makeAutoObservable } from 'mobx';
import SUN_IMAGE from '../images/sun.svg';
import MOON_IMAGE from '../images/moon.svg';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

class ThemeStore {
  public theme: string = LIGHT_THEME;
  public themeImage: string = SUN_IMAGE;

  constructor() {
    makeAutoObservable(this);
    const theme = localStorage.getItem('theme');
    if (theme != null) this.theme = theme;
    if (this.theme === LIGHT_THEME) this.setLightTheme();
    if (this.theme === DARK_THEME) this.setDarkTheme();
  }

  public toggleTheme() {
    if (this.theme === LIGHT_THEME) {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
  }

  private setTheme(theme: string) {
    localStorage.setItem('theme', theme);
    this.theme = theme;
  }

  private setLightTheme() {
    const html = document.getElementById('html');
    html?.classList.remove(DARK_THEME);
    html?.classList.add(LIGHT_THEME);
    this.setTheme(LIGHT_THEME);
    this.themeImage = MOON_IMAGE;
  }

  private setDarkTheme() {
    const html = document.getElementById('html');
    html?.classList.remove(LIGHT_THEME);
    html?.classList.add(DARK_THEME);
    this.setTheme(DARK_THEME);
    this.themeImage = SUN_IMAGE;
  }
}

export default ThemeStore;
