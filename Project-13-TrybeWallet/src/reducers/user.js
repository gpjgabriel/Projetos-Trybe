import { EMAIL_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL_LOGIN:
    return action.payload;
  default:
    return state;
  }
};

export default loginReducer;
