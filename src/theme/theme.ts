export function setDarkTheme () {
  const html = document.getElementById('html');
  html?.classList.remove('light');
  html?.classList.add('dark');

  const header = document.querySelector('.header');
  header?.classList.remove('light')
  header?.classList.add('dark');

  const footer = document.querySelector('.footer');
  footer?.classList.remove('light');
  footer?.classList.add('dark');

  const progressBar = document.querySelector('.progress');
  progressBar?.classList.remove('light');
  progressBar?.classList.add('dark');

  const gamecardsLinks = document.querySelector('.gamecards__link');
  gamecardsLinks?.classList.remove('light');
  gamecardsLinks?.classList.add('dark');

  const currentNav = document.querySelector('.nav__current');
  currentNav?.classList.remove('light');
  currentNav?.classList.add('dark');

  const libraryLists = document.querySelector('.library__list');
  libraryLists?.classList.remove('light')
  libraryLists?.classList.remove('dark')

  const libraryList = document.querySelectorAll('.library__list');

  libraryList?.forEach((row) => {
    row.classList.remove('light');
    row.classList.add('dark');
  });

  const gamecards = document.querySelectorAll('.gamecards__link');

  gamecards?.forEach((card) => {
    card.classList.remove('light');
    card.classList.add('dark');
  });
};

export function setLightTheme () {

  const html = document.getElementById('html');
  html?.classList.remove('dark');
  html?.classList.add('light');

  const header = document.querySelector('.header');
  header?.classList.remove('dark')
  header?.classList.add('light');

  const footer = document.querySelector('.footer');
  footer?.classList.remove('dark');
  footer?.classList.add('light');

  const progressBar = document.querySelector('.progress');
  progressBar?.classList.remove('dark');
  progressBar?.classList.add('light');

  const gamecardsLinks = document.querySelector('.gamecards__link');
  gamecardsLinks?.classList.remove('dark');
  gamecardsLinks?.classList.add('light');

  const currentNav = document.querySelector('.nav__current');
  currentNav?.classList.remove('dark');
  currentNav?.classList.add('light');

  const libraryLists = document.querySelector('.library__list');
  libraryLists?.classList.remove('dark')
  libraryLists?.classList.remove('light')

  const gamecards = document.querySelectorAll('.gamecards__link');

  gamecards?.forEach((card) => {
    card.classList.remove('dark');
    card.classList.add('light');
  });

  const libraryList = document.querySelectorAll('.library__list');

  libraryList?.forEach((row) => {
    row.classList.remove('dark');
    row.classList.add('light');
  });
};
