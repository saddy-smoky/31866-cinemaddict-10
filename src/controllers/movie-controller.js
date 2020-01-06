import FilmCard from "../components/card";
import FilmDetails from "../components/film-details";
import {remove, render, RenderPosition} from "../utils/render";

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
  }

  render(card) {
    /* const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;*/

    this._filmComponent = new FilmCard(card);
    this._filmDetailsComponent = new FilmDetails(card);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        remove(this._filmDetailsComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._filmComponent.setClickHandler(() => {
      this._onViewChange();
      render(document.body, this._filmDetailsComponent, RenderPosition.BEFOREEND);

      document.addEventListener(`keydown`, onEscKeyDown);

      /* this._filmDetailsComponent.setCloseClickHandler(() => {
        remove(this._filmDetailsComponent);
      });*/
    });

    this._filmComponent.setWatchlistClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        watchlist: !card.watchlist,
      }));
    });

    this._filmComponent.setWatchedClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        history: !card.history,
      }));
    });

    this._filmComponent.setFavouritesClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        favorites: !card.favorites,
      }));
    });

    /* if (oldFilmDetailsComponent && oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._taskComponent, RenderPosition.BEFOREEND);
    }*/

    render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }
}
