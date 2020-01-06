import {remove, render, RenderPosition} from "../utils/render";
import LoadMoreButton from "../components/more-btn";
import NoFilms from "../components/no-films";
import MainContainer from "../components/main-container";
import SortComponent, {SortType} from "../components/sort";
import MovieController from "./movie-controller";

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const renderFilms = (cards, container, onDataChange, onViewChange) => {
  return cards.map((card) => {
    const filmController = new MovieController(container, onDataChange, onViewChange);
    filmController.render(card);
    return filmController;
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._noFilmsComponent = new NoFilms();
    this._filmsListComponent = new MainContainer();
    this._loadMoreButtonComponent = new LoadMoreButton();
    this._sortComponent = new SortComponent();
    this._showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
    this._showedTaskControllers = [];
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(cards) {
    this._cards = cards;
    // const container = this._container.getElement();

    this._filmsListContainer = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    this._extraFilmsList = this._filmsListComponent.getElement().querySelectorAll(`.films-list--extra`);
    this._topRatedContainer = this._extraFilmsList[0].querySelector(`.films-list__container`);
    this._mostCommentedContainer = this._extraFilmsList[1].querySelector(`.films-list__container`);

    const sortedFilmsByComments = this._cards.slice(0, this._cards.length - 1).sort((a, b) => {
      if (a.commentsVal > b.commentsVal) {
        return -1;
      } else if (a.commentsVal === b.commentsVal) {
        return 0;
      } else {
        return 1;
      }
    });

    const sortedFilmsByRating = this._cards.slice(0, this._cards.length - 1).sort((a, b) => {
      if (parseFloat(a.rating) > parseFloat(b.rating)) {
        return -1;
      } else if (parseFloat(a.rating) === parseFloat(b.rating)) {
        return 0;
      } else {
        return 1;
      }
    });

    const isThereFilms = this._cards.length > 0;

    if (!isThereFilms) {
      render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmsListComponent, RenderPosition.BEFOREEND);

    const mainFilms = renderFilms(this._cards.slice(0, this._showingCardsCount), this._filmsListContainer, this._onDataChange, this._onViewChange);
    const ratedFilms = renderFilms(sortedFilmsByRating.slice(0, 2), this._topRatedContainer, this._onDataChange, this._onViewChange);
    const commentedFilms = renderFilms(sortedFilmsByComments.slice(0, 2), this._mostCommentedContainer, this._onDataChange, this._onViewChange);

    this._showedTaskControllers = this._showedTaskControllers.concat(mainFilms, ratedFilms, commentedFilms);

    this._renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedCards = [];

      switch (sortType) {
        case SortType.BY_RATING:
          sortedCards = this._cards.slice().sort((a, b) => b.rating - a.rating);
          break;
        case SortType.BY_DATE:
          sortedCards = this._cards.slice().sort((a, b) => b.year - a.year);
          break;
        case SortType.DEFAULT:
          sortedCards = this._cards.slice(0, this._showingCardsCount);
          break;
      }

      this._filmsListContainer.innerHTML = ``;
      const newFilms = renderFilms(sortedCards, this._filmsListContainer, this._onDataChange, this._onViewChange);

      this._showedTaskControllers = newFilms;

      if (sortType === SortType.DEFAULT) {
        this._renderLoadMoreButton();
      } else {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _renderLoadMoreButton() {
    if (this._showingCardsCount >= this._cards.length) {
      return;
    }

    render(this._filmsListComponent.getElement().querySelector(`.films-list`), this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevCardCount = this._showingCardsCount;
      this._showingCardsCount = this._showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

      const newFilms = renderFilms(this._cards.slice(prevCardCount, this._showingCardsCount), this._filmsListContainer, this._onDataChange, this._onViewChange);

      this._showedTaskControllers = this._showedTaskControllers.concat(newFilms);

      if (this._showingCardsCount >= this._cards.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._cards.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._cards = [].concat(this._cards.slice(0, index), newData, this._cards.slice(index + 1));

    movieController.render(this._cards[index]);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }
}
