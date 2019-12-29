import FilmCard from "../components/card";
import FilmDetails from "../components/film-details";
import {remove, render, RenderPosition} from "../utils/render";
import LoadMoreButton from "../components/more-btn";
import NoFilms from "../components/no-films";
import MainContainer from "../components/main-container";
import SortComponent, {SortType} from "../components/sort";

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const renderFilm = (card, container) => {
  const filmComponent = new FilmCard(card);
  const filmDetailsComponent = new FilmDetails(card);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      remove(filmDetailsComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmComponent.setClickHandler(() => {
    render(document.body, filmDetailsComponent, RenderPosition.BEFOREEND);

    document.addEventListener(`keydown`, onEscKeyDown);

    filmDetailsComponent.setCloseClickHandler(() => {
      remove(filmDetailsComponent);
    });
  });

  render(container, filmComponent, RenderPosition.BEFOREEND);
};

const renderFilms = (cards, container) => {
  cards.forEach((card) => {
    renderFilm(card, container);
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._noFilmsComponent = new NoFilms();
    this._filmsListComponent = new MainContainer();
    this._loadMoreButtonComponent = new LoadMoreButton();
    this._sortComponent = new SortComponent();
  }

  render(cards) {
    const renderLoadMoreButton = () => {
      if (showingCardsCount >= cards.length) {
        return;
      }

      render(this._filmsListComponent.getElement().querySelector(`.films-list`), this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevCardCount = showingCardsCount;
        showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

        cards.slice(prevCardCount, showingCardsCount)
          .forEach((card) => {
            renderFilm(card, filmsListContainer);
          });

        if (showingCardsCount >= cards.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    };

    // const container = this._container.getElement();

    const filmsListContainer = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    const extraFilmsList = this._filmsListComponent.getElement().querySelectorAll(`.films-list--extra`);
    const topRatedContainer = extraFilmsList[0].querySelector(`.films-list__container`);
    const mostCommentedContainer = extraFilmsList[1].querySelector(`.films-list__container`);

    const sortedFilmsByComments = cards.slice(0, cards.length - 1).sort((a, b) => {
      if (a.commentsVal > b.commentsVal) {
        return -1;
      } else if (a.commentsVal === b.commentsVal) {
        return 0;
      } else {
        return 1;
      }
    });

    const sortedFilmsByRating = cards.slice(0, cards.length - 1).sort((a, b) => {
      if (parseFloat(a.rating) > parseFloat(b.rating)) {
        return -1;
      } else if (parseFloat(a.rating) === parseFloat(b.rating)) {
        return 0;
      } else {
        return 1;
      }
    });

    let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
    const isThereFilms = cards.length > 0;

    if (!isThereFilms) {
      render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmsListComponent, RenderPosition.BEFOREEND);

    renderFilms(cards.slice(0, showingCardsCount), filmsListContainer);
    renderFilms(sortedFilmsByRating.slice(0, 2), topRatedContainer);
    renderFilms(sortedFilmsByComments.slice(0, 2), mostCommentedContainer);

    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedCards = [];

      switch (sortType) {
        case SortType.BY_RATING:
          sortedCards = cards.slice().sort((a, b) => b.rating - a.rating);
          break;
        case SortType.BY_DATE:
          sortedCards = cards.slice().sort((a, b) => b.year - a.year);
          break;
        case SortType.DEFAULT:
          sortedCards = cards.slice(0, showingCardsCount);
          break;
      }

      filmsListContainer.innerHTML = ``;
      renderFilms(sortedCards, filmsListContainer);

      if (sortType === SortType.DEFAULT) {
        renderLoadMoreButton();
      } else {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
}
