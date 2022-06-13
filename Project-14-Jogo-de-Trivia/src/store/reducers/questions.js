import { DATA_QUESTION } from '../actions';

const INITIAL_STATE = '';

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DATA_QUESTION:
    return action.payload;
  default:
    return state;
  }
};

export default questionsReducer;
