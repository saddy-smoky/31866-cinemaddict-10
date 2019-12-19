import {descriptionSource, monthNames} from "./const";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

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

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
