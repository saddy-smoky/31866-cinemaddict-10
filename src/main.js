import {generateCards} from "./mock/card";
import {render, RenderPosition} from './utils/render.js';
import Profile from "./components/profile";
import Navigation from "./components/navigation";
import SortContainer from "./components/sort";
import PageController from "./controllers/page-controller";

const CARD_COUNT = 15;


const headerBlock = document.querySelector(`.header`);

const profileComponent = new Profile(55);
render(headerBlock, profileComponent, RenderPosition.BEFOREEND);

const mainBlock = document.querySelector(`.main`);

// const cards = [];

/* const sortContainer = new SortContainer();
render(mainBlock, sortContainer, RenderPosition.BEFOREEND);*/

const cards = generateCards(CARD_COUNT);

const navigationContainer = new Navigation(cards);
render(mainBlock, navigationContainer, RenderPosition.BEFOREEND);

const pageController = new PageController(mainBlock);

pageController.render(cards);
