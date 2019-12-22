import {createElement} from "../util";

const createNoFilms = () => `<h2 class="films-list__title">There are no movies in our database</h2>`;

export default class NoFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoFilms();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
