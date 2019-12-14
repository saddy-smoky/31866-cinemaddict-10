export const createProfile = (filmsCount) => {
  let rating = ``;
  if (filmsCount > 0 && filmsCount <= 10) {
    rating = `novice`;
  } else if (filmsCount > 10 && filmsCount <= 20) {
    rating = `fan`;
  } else if (filmsCount > 20) {
    rating = `movie buff`;
  }

  return `<section class="header__profile profile">
    <p class="profile__rating">${rating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

