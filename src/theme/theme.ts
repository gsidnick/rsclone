export function setDarkTheme() {
  const html = document.getElementById('html');
  html?.classList.remove('light');
  html?.classList.add('dark');
}

export function setLightTheme() {
  const html = document.getElementById('html');
  html?.classList.remove('dark');
  html?.classList.add('light');
}
