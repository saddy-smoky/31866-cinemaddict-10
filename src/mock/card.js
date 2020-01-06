import {filmNames, filmTypes, posterNames, postersPath} from '../const';
import {
  getCommentsVal,
  getDescription,
  getRandomArrayItem,
  getRandomDuration,
  getRandomRate,
  getFullDate,
  getRandomYear
} from "../utils/common";

export const emotions = [`smile`, `sleeping`, `puke`, `angry`];
const actors = [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`];
const director = `Anthony Mann`;
const writers = [`Anne Wigton`, `Heinz Herald`, `Richard Weil`];
const country = `USA`;
const minAge = `18+`;

const generateCard = () => {
  const genres = [];

  for (let i = 0; i < 3; i++) {
    genres.push(getRandomArrayItem(filmTypes));
  }
  return {
    minAge,
    director,
    writers,
    actors,
    country,
    genres,
    filmName: getRandomArrayItem(filmNames),
    rating: getRandomRate(),
    userRating: parseInt(getRandomRate(), 10),
    year: getRandomYear(),
    date: getFullDate(),
    duration: getRandomDuration(),
    type: getRandomArrayItem(filmTypes),
    posterPath: postersPath + getRandomArrayItem(posterNames),
    description: getDescription(),
    commentsVal: getCommentsVal(),
    watchlist: Math.random() > 0.5,
    history: Math.random() > 0.5,
    favorites: Math.random() > 0.5,
    // emotion: getRandomArrayItem(emotions)
  };
};

const generateCards = (count) => {
  const cardsArr = [];

  for (let i = 0; i < count; i++) {
    cardsArr.push(generateCard());
  }
  return cardsArr;
};

export {generateCard, generateCards};
