import {createProfile} from "./components/profile";
import {createNavigation} from "./components/navigation";
import {createMainContainer} from "./components/main-container";
import {createFilmCard} from "./components/card";
import {createMoreButton} from "./components/more-btn";
import {createPopup} from "./components/film-details";
import {generateCards} from "./mock/card";
import {generateFilmDetails} from "./mock/film-details";

const CARD_COUNT = 15;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const headerBlock = document.querySelector(`.header`);

render(headerBlock, createProfile(55));

const mainBlock = document.querySelector(`.main`);

const cards = generateCards(CARD_COUNT);

render(mainBlock, createNavigation(cards));

render(mainBlock, createMainContainer());

const filmsList = document.querySelector(`.films-list`);
const filmsListContainer = document.querySelector(`.films-list__container`);
const extraFilmsList = document.querySelectorAll(`.films-list--extra`);
const topRatedContainer = extraFilmsList[0].querySelector(`.films-list__container`);
const mostCommentedContainer = extraFilmsList[1].querySelector(`.films-list__container`);

const sortedFilmsByComments = cards.sort((a, b) => {
  if (a.commentsVal > b.commentsVal) {
    return 1;
  }
  if (a.commentsVal === b.commentsVal) {
    return 0;
  }
  if (a.commentsVal < b.commentsVal) {
    return -1;
  }
});


// const twoFilmsByComments = sortedFilmsByComments.slice(0, 1);
const sortedFilmsByRating = cards.sort((a, b) => {
  if (parseFloat(a.rating) > parseFloat(b.rating)) {
    return 1;
  }
  if (parseFloat(a.rating) === parseFloat(b.rating)) {
    return 0;
  }
  if (parseFloat(a.rating) < parseFloat(b.rating)) {
    return -1;
  }
});
// const twoFilmsByRating = sortedFilmsByRating.slice(0, 1);

let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

cards.slice(0, showingCardsCount).forEach((card) => render(filmsListContainer, createFilmCard(card), `beforeend`));
sortedFilmsByRating.slice(0, 2).forEach((card) => render(topRatedContainer, createFilmCard(card), `beforeend`));
sortedFilmsByComments.slice(0, 2).forEach((card) => render(mostCommentedContainer, createFilmCard(card), `beforeend`));

// render(filmsListContainer, createFilmCard());
render(filmsList, createMoreButton());

render(document.body, createPopup(generateFilmDetails()));
const closePopupBtn = document.querySelector(`.film-details__close-btn`);
const filmDetails = document.querySelector(`.film-details`);

closePopupBtn.addEventListener(`click`, () => {
  filmDetails.style.left = `100%`;
});

const loadMoreButton = filmsList.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevCardCount = showingCardsCount;
  showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  cards.slice(prevCardCount, showingCardsCount)
    .forEach((card) => render(filmsListContainer, createFilmCard(card), `beforeend`));

  if (showingCardsCount >= cards.length) {
    loadMoreButton.remove();
  }
});

