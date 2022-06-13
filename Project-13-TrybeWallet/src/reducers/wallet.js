import {
  REQUEST_API_EXPENSES,
  GET_EXPENSES,
  FAIL_REQUEST,
  GET_CURRENCY,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  LOAD_FORM_EDIT,
} from '../actions';

export const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
  error: '',
  loadFormEdit: false,
  idExpenseEdit: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: [...action.responseApi],
      loading: false,
      error: '',
    };
  case REQUEST_API_EXPENSES:
    return {
      ...state,
      // loading: true,
    };
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses,
        { ...action.stateWallet, exchangeRates: action.responseApi }],
      loading: false,
    };
  case FAIL_REQUEST:
    return {
      ...state,
      loading: true,
      error: action.payload,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.updateExpense,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: action.editExpense,
      loadFormEdit: false,
    };
  case LOAD_FORM_EDIT:
    return {
      ...state,
      loadFormEdit: true,
      idExpenseEdit: action.idExpense,
    };
  default:
    return state;
  }
};

export default wallet;
