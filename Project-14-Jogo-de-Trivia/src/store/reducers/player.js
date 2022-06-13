const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN_DATA':
    return {
      score: 0,
      assertions: 0,
      name: action.dados.usernameLogin,
      gravatarEmail: action.dados.emailLogin,
    };
  case 'NEW_POINT':
    return {
      ...state,
      score: action.point.score,
      assertions: action.point.assertions,
      /* case 'SCORE_DATA':
    return {
      ...state,
      score: action.payload, */
    };
  default:
    return state;
  }
};

export default player;
