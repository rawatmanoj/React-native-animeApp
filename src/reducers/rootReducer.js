import {combineReducers} from 'redux';
import getAnimeReducer from './getAnimeReducer';

const rootReducer = combineReducers({
  getAnime: getAnimeReducer,
});

export default rootReducer;
