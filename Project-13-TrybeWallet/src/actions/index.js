export const EMAIL_LOGIN = 'EMAIL_LOGIN';
export const GET_CURRENCY = 'GET_CURRENCY';
export const REQUEST_API_EXPENSES = 'REQUEST_API_EXPENSES';
export const GET_EXPENSES = 'GET_EXPENSES';
export const FAIL_REQUEST = 'FAIL_REQUEST';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const LOAD_FORM_EDIT = 'LOAD_FORM_EDIT';

const CURRENCY_LENGTH = 3;

export const emailLogin = (payload) => ({
  type: EMAIL_LOGIN,
  payload,
});

export const getCurrency = (responseApi) => ({
  type: GET_CURRENCY,
  responseApi,
});

export const requestApiExpenses = () => ({
  type: REQUEST_API_EXPENSES,
});

export const getExpenses = (stateWallet, responseApi) => ({
  type: GET_EXPENSES,
  stateWallet,
  responseApi,
});

export const failRequest = (error) => ({
  type: FAIL_REQUEST,
  payload: error,
});

export const deleteExpense = (updateExpense) => ({
  type: DELETE_EXPENSE,
  updateExpense,
});

export const fnLoadFormEdit = (idExpense) => ({
  type: LOAD_FORM_EDIT,
  idExpense,
});

export const fnEditExpense = (editExpense) => ({
  type: EDIT_EXPENSE,
  editExpense,
});

export const fetchApiExpensesAction = (stateWallet) => async (dispatch) => {
  dispatch(requestApiExpenses());
  try {
    const getExpensesApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseApi = await getExpensesApi.json();
    if (stateWallet === null) {
      const currencyKeys = Object.keys(responseApi);
      const arrCurrency = currencyKeys
        .filter((currency) => currency.length === CURRENCY_LENGTH);
      return dispatch(getCurrency(arrCurrency));
    }
    return dispatch(getExpenses(stateWallet, responseApi));
  } catch (error) {
    dispatch(failRequest(error));
  }
};
