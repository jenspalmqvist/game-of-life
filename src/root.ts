import gameReducer from './game/reducers/gameReducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  game: gameReducer,
});

export default { appReducer };
