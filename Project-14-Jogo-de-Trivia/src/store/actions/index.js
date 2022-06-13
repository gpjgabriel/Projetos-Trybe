export const LOGIN_DATA = 'LOGIN_DATA';
export const TOKEN = 'TOKEN';
export const DATA_QUESTION = 'DATA_QUESTION';
export const LOGIN = 'LOGIN';
export const NEW_POINT = 'NEW_POINT';
export const SCORE_DATA = 'SCORE_DATA';

export const loginAction = (payload) => ({ type: LOGIN, payload });

export const tokenLogin = (token) => ({ type: TOKEN, token });

export const dataLogin = (dados) => ({ type: LOGIN_DATA, dados });

export const dataQuestions = (payload) => ({ type: DATA_QUESTION, payload });

export const pointNew = (point) => ({ type: NEW_POINT, point });
export const scoreData = (payload) => ({ type: SCORE_DATA, payload });
