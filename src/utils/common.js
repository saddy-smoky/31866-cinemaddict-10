import {descriptionSource, monthNames} from "../const";

export const getRandomInt = (min, max) => min + Math.floor(max * Math.random());

export const getRandomYear = () => {
  const targetDate = new Date();
  const diffValue = getRandomInt(20, 50);

  return targetDate.getFullYear() - diffValue;
};


export const getFullDate = () => {
  const day = getRandomInt(0, 29);
  const month = getRandomArrayItem(monthNames);
  const year = getRandomYear();

  return `${day} ${month} ${year}`;
};

export const getRandomArrayItem = (array) => {
  const randIndex = getRandomInt(0, array.length);

  return array[randIndex];
};

export const getRandomRate = () => Math.random() * 1000 / 100;

export const getRandomDuration = () => `${getRandomInt(0, 2)}h ${getRandomInt(0, 59)}m`;

export const getCommentsVal = () => {
  const val = getRandomInt(0, 100);

  return val;
};

export const getDescription = () => {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    arr.push(getRandomArrayItem(descriptionSource));
  }
  return arr.join(` `);
};


