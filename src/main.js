import {createProfile} from "./components/profile";
import {createNavigation} from "./components/navigation";
import {createMainContainer} from "./components/main-container";
import {createFilmCard} from "./components/card";
import {createMoreButton} from "./components/more-btn";

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const headerBlock = document.querySelector(`.header`);

render(headerBlock, createProfile());

const mainBlock = document.querySelector(`.main`);

render(mainBlock, createNavigation());

render(mainBlock, createMainContainer());

const filmsList = document.querySelector(`.films-list`);
const filmsListContainer = document.querySelector(`.films-list`);

render(filmsListContainer, createFilmCard());
render(filmsList, createMoreButton());
