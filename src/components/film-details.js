import AbstractSmartComponent from "./abstract-smart-component";
import {remove} from "../utils/render";
import {emotions} from "../mock/card";
import {formatDate, formatTime} from "../const";

const createUserRatingSection = (name, poster, value) => {
  let renderRating = ``;

  for (let i = 1; i <= 9; i++) {
    renderRating += `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i}" id="rating-${i}" ${value === i ? `checked` : ``}>
              <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>`;
  }

  return `<section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="${poster}" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${name}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              ${renderRating}
            </div>
          </section>
        </div>
      </section>`;
};

const createTopUserRating = (userRating) => `<p class="film-details__user-rating">Your rate ${userRating}</p>`;

const createReview = (userEmotion) => {
  let emotionsString = ``;
  let emotionImg = ``;

  for (let i = 0; i < emotions.length; i++) {
    let isChecked = ``;

    if (userEmotion === emotions[i]) {
      isChecked = `checked`;
      emotionImg = `<img src="./images/emoji/${emotions[i]}.png" width="30" height="30" alt="emoji">`;
    }

    emotionsString += `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotions[i]}" value="${emotions[i]}" ${isChecked}>
            <label class="film-details__emoji-label" for="emoji-${emotions[i]}">
              <img src="./images/emoji/${emotions[i]}.png" width="30" height="30" alt="emoji">
            </label>`;
  }

  return `<div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label">
              ${emotionImg}
            </div>

            <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>
          <div class="film-details__emoji-list">
            ${emotionsString}
          </div>
        </div>`;
};

const createPopup = (filmDetails, options = {}) => {
  const {
    filmName, rating, date, duration, genres, posterPath, description, director, writers, actors, country, minAge
  } = filmDetails;
  const {isInWatchlist, isInHistory, isFavorite, userRating, userEmotion} = options;

  const createGenres = () => {
    let layout = ``;
    genres.forEach((el) => {
      layout += `<span class="film-details__genre">${el}</span>`;
    });
    return layout;
  };
  const userRatingSection = createUserRatingSection(filmName, posterPath, userRating);
  const topUserRatingMarkup = isInHistory && userRating > 0 ? createTopUserRating(userRating) : ``;
  const reviewMarkup = createReview(userEmotion);

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${posterPath}" alt="">

          <p class="film-details__age">${minAge}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmName}</h3>
              <p class="film-details__title-original">Original: ${filmName}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating.toFixed(2)}</p>

              ${topUserRatingMarkup}
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${formatDate(date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${formatTime(duration)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${createGenres()}
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}

          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist" ${isInWatchlist ? `checked` : ``}>Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isInHistory ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched" >Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__middle-container">
      ${isInHistory ? userRatingSection : ``}
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

        <ul class="film-details__comments-list">
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">Interesting setting and a good cast</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">Tim Macoveev</span>
                <span class="film-details__comment-day">3 days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">Booooooooooring</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">2 days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/puke.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">Very very old. Meh</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">2 days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/angry.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">Almost two hours? Seriously?</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">Today</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
        </ul>

        ${reviewMarkup}
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(info) {
    super();
    this._info = info;
    this._isInWatchlist = info.watchlist;
    this._isInHistory = info.history;
    this._isFavorite = info.favorites;
    this._userRating = info.userRating;
    this._userEmotion = info.emotion;

    this.recoveryListeners();
  }

  getTemplate() {
    return createPopup(this._info, {
      isInWatchlist: this._isInWatchlist,
      isInHistory: this._isInHistory,
      isFavorite: this._isFavorite,
      userRating: this._userRating,
      userEmotion: this._userEmotion
    });
  }

  recoveryListeners() {
    const element = this.getElement();

    element.querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
      remove(this);
    });

    /* element.querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, handler);
    element.querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, handler);*/

    this._setRatingInputsChangeHandler();
    this._setEmotionInputsChangeHandler();
    this.setHistoryCLickHandler(element);
  }

  setHistoryCLickHandler(element) {
    element.querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this.onHistoryChange.bind(this));
  }


  onHistoryChange() {
    this._userRating = 0;
    this._isInHistory = !this._isInHistory;

    this.rerender();

    this._setRatingInputsChangeHandler();
  }

  _setRatingInputsChangeHandler() {
    if (this._isInHistory) {
      [...this.getElement().querySelectorAll(`.film-details__user-rating-input`)].forEach((el) => {
        el.addEventListener(`change`, () => {
          this._userRating = parseInt(el.value, 10);

          this.rerender();
        });
      });
    }
  }

  _setEmotionInputsChangeHandler() {
    [...this.getElement().querySelectorAll(`.film-details__emoji-item`)].forEach((el) => {
      el.addEventListener(`change`, () => {
        this._userEmotion = el.value;

        this.rerender();
      });
    });
  }
}
