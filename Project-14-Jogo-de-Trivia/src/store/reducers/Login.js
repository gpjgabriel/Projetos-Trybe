import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  nome: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.payload.emailLogin,
      nome: action.payload.usernameLogin,
    };
  default:
    return state;
  }
};

export default login;
