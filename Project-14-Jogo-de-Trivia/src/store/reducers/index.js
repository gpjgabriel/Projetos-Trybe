import { combineReducers } from 'redux';
import login from './Login';
import token from './token';
import player from './player';
import questionsReducer from './questions';

const rootReducer = combineReducers({ token, player, login, questionsReducer });

export default rootReducer;
