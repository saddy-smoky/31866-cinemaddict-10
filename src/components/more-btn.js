import AbstractComponent from "./abstract-component";

const createMoreButton = () => `<button class="films-list__show-more">Show more</button>`;

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return createMoreButton();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
