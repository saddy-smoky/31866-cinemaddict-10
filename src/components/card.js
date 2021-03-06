import AbstractComponent from "./abstract-component";
import {formatTime} from "../const";

const createFilmCard = (card) => {
  const {filmName, rating, year, duration, type, posterPath, description, commentsVal} = card;

  return `<article class="film-card">
          <h3 class="film-card__title">${filmName}</h3>
          <p class="film-card__rating">${rating.toFixed(2)}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${formatTime(duration)}</span>
            <span class="film-card__genre">${type}</span>
          </p>
          <img src="${posterPath}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${commentsVal} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`;
};

export default class FilmCard extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createFilmCard(this._card);
  }

  setClickHandler(handler) {
    const clickableFilmElements = [];
    clickableFilmElements.push(this.getElement().querySelector(`.film-card__title`));
    clickableFilmElements.push(this.getElement().querySelector(`.film-card__poster`));
    clickableFilmElements.push(this.getElement().querySelector(`.film-card__comments`));

    clickableFilmElements.forEach((el) => {
      el.addEventListener(`click`, handler);
    });
  }

  setWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  setWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  setFavouritesClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}
