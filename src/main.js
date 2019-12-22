import {generateCards} from "./mock/card";
import {render, RenderPosition} from './util.js';
import Profile from "./components/profile";
import Navigation from "./components/navigation";
import MainContainer from "./components/main-container";
import FilmCard from "./components/card";
import LoadMoreButton from "./components/more-btn";
import SortContainer from "./components/sort";
import FilmDetails from "./components/film-details";

const CARD_COUNT = 15;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const renderFilm = (film, container) => {
  const filmComponent = new FilmCard(film);
  const filmDetailsComponent = new FilmDetails(film);
  const clickableFilmElements = [];

  clickableFilmElements.push(filmComponent.getElement().querySelector(`.film-card__title`));
  clickableFilmElements.push(filmComponent.getElement().querySelector(`.film-card__poster`));
  clickableFilmElements.push(filmComponent.getElement().querySelector(`.film-card__comments`));
  clickableFilmElements.forEach((el) => {
    el.addEventListener(`click`, () => {
      render(document.body, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
      filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
        filmDetailsComponent.getElement().remove();
        filmDetailsComponent.removeElement();
      });
    });
  });
  render(container, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const headerBlock = document.querySelector(`.header`);

const profileComponent = new Profile(55);
render(headerBlock, profileComponent.getElement(), RenderPosition.BEFOREEND);

const mainBlock = document.querySelector(`.main`);

const cards = generateCards(CARD_COUNT);

const sortContainer = new SortContainer();
render(mainBlock, sortContainer.getElement(), RenderPosition.BEFOREEND);

const navigationContainer = new Navigation(cards);
render(mainBlock, navigationContainer.getElement(), RenderPosition.BEFOREEND);

const filmsListComponent = new MainContainer();
render(mainBlock, filmsListComponent.getElement(), RenderPosition.BEFOREEND);

const filmsListContainer = filmsListComponent.getElement().querySelector(`.films-list__container`);
const extraFilmsList = filmsListComponent.getElement().querySelectorAll(`.films-list--extra`);
const topRatedContainer = extraFilmsList[0].querySelector(`.films-list__container`);
const mostCommentedContainer = extraFilmsList[1].querySelector(`.films-list__container`);

const sortedFilmsByComments = cards.slice(0, cards.length - 1).sort((a, b) => {
  if (a.commentsVal > b.commentsVal) {
    return -1;
  }
  if (a.commentsVal === b.commentsVal) {
    return 0;
  }
  if (a.commentsVal < b.commentsVal) {
    return 1;
  }
});

const sortedFilmsByRating = cards.slice(0, cards.length - 1).sort((a, b) => {
  if (parseFloat(a.rating) > parseFloat(b.rating)) {
    return -1;
  }
  if (parseFloat(a.rating) === parseFloat(b.rating)) {
    return 0;
  }
  if (parseFloat(a.rating) < parseFloat(b.rating)) {
    return 1;
  }
});

let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

cards.slice(0, showingCardsCount).forEach((card) => {
  renderFilm(card, filmsListContainer);
});

sortedFilmsByRating.slice(0, 2).forEach((card) => {
  renderFilm(card, topRatedContainer);
});

sortedFilmsByComments.slice(0, 2).forEach((card) => {
  renderFilm(card, mostCommentedContainer);
});

const loadMoreButtonComponent = new LoadMoreButton();
render(filmsListComponent.getElement().querySelector(`.films-list`), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const prevCardCount = showingCardsCount;
  showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  cards.slice(prevCardCount, showingCardsCount)
    .forEach((card) => {
      renderFilm(card, filmsListContainer);
    });

  if (showingCardsCount >= cards.length) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }
});

