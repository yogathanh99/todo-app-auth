import * as actionTypes from '../actions/actionTypes';

const initState = {
  error: null,
  loading: false,
};

const addStart = state => {
  return { ...state, loading: true };
};

const addSuccess = state => {
  return { ...state, error: false };
};

const addFail = (state, payload) => {
  return { ...state, error: payload };
};

const addEnd = state => {
  return { ...state, loading: false };
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO_START:
      return addStart(state);

    case actionTypes.ADD_TODO_SUCCESS:
      return addSuccess(state);

    case actionTypes.ADD_TODO_FAIL:
      return addFail(state, action.payload);

    case actionTypes.AUTH_END:
      return addEnd(state);

    default:
      return state;
  }
};
