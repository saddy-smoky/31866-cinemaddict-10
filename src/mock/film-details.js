import {filmNames, filmTypes, posterNames, postersPath} from '../const';
import {
  getCommentsVal,
  getDescription,
  getFullDate,
  getRandomArrayItem,
  getRandomDuration,
  getRandomRate,
} from "../utils/common";

const actors = [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`];
const director = `Anthony Mann`;
const writers = [`Anne Wigton`, `Heinz Herald`, `Richard Weil`];
const country = `USA`;
const minAge = `18+`;

const generateFilmDetails = () => {
  const filmName = getRandomArrayItem(filmNames);
  const genres = [];

  for (let i = 0; i < 3; i++) {
    genres.push(getRandomArrayItem(filmTypes));
  }

  return {
    minAge,
    filmName,
    originalFilmName: filmName,
    rating: getRandomRate(),
    userRating: getRandomRate(),
    director,
    writers,
    actors,
    date: getFullDate(),
    country,
    duration: getRandomDuration(),
    genres,
    posterPath: postersPath + getRandomArrayItem(posterNames),
    description: getDescription(),
    commentsVal: getCommentsVal()
  };
};

export {generateFilmDetails};
