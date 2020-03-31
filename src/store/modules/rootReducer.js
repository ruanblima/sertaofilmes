import { combineReducers } from 'redux';

import moviesRecent from './moviesRecent/reducer';
import moviesGenre from './moviesGenre/reducer';
import searchMovies from './searchMovies/reducer';

export default combineReducers({
  moviesRecent,
  moviesGenre,
  searchMovies,
});
