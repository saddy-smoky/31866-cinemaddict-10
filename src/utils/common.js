import {descriptionSource} from "../const";

export const getRandomInt = (min, max) => min + Math.floor(max * Math.random());

export const getRandomDuration = () => {
  const targetDate = new Date();

  targetDate.setHours(getRandomInt(0, 3));
  targetDate.setMinutes(getRandomInt(0, 59));
  return targetDate;
};

export const getFullDate = () => {
  const targetDate = new Date();
  const year = targetDate.getFullYear() - parseInt(Math.random() * 100, 10);

  targetDate.setFullYear(year);
  targetDate.setMonth(getRandomInt(0, 11));
  targetDate.setDate(getRandomInt(0, 7));
  return targetDate;
};

export const getRandomArrayItem = (array) => {
  const randIndex = getRandomInt(0, array.length);

  return array[randIndex];
};

export const getRandomRate = () => Math.random() * 1000 / 100;

// export const getRandomDuration = () => `${getRandomInt(0, 2)}:${getRandomInt(0, 59)}`;

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


