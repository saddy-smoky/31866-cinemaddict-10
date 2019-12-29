import AbstractComponent from "./abstract-component";

const createNavigation = (cards) => {

  let watchListCount = 0;
  let historyCount = 0;
  let favouritesCount = 0;

  cards.forEach((el) => {
    if (el.watchlist) {
      watchListCount++;
    }
    if (el.history) {
      historyCount++;
    }
    if (el.favorites) {
      favouritesCount++;
    }
  });
  return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchListCount}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyCount}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favouritesCount}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
};

export default class Navigation extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createNavigation(this._cards);
  }
}
