import {filmNames, filmTypes, posterNames, postersPath} from '../const';
import {
  getCommentsVal,
  getDescription,
  getRandomArrayItem,
  getRandomDuration,
  getRandomRate,
  getRandomYear
} from "../util";


const generateCard = () => {
  return {
    filmName: getRandomArrayItem(filmNames),
    rating: getRandomRate(),
    year: getRandomYear(),
    duration: getRandomDuration(),
    type: getRandomArrayItem(filmTypes),
    posterPath: postersPath + getRandomArrayItem(posterNames),
    description: getDescription(),
    commentsVal: getCommentsVal(),
    watchlist: Math.random() > 0.5,
    history: Math.random() > 0.5,
    favorites: Math.random() > 0.5
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
