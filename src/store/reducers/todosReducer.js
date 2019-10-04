import * as actionTypes from '../actions/actionTypes';

const initState = {
  error: null,
  loading: false,
  deleteTodo: {
    error: null,
    loading: null,
  },
};

const addStart = state => {
  return { ...state, loading: true };
};

const addSuccess = state => {
  return { ...state, error: false, loading: false };
};

const addFail = (state, payload) => {
  return { ...state, error: payload };
};

const deleteStart = state => {
  return { ...state, deleteTodo: { ...state.deleteTodo, loading: true } };
};

const deleteSuccess = state => {
  return {
    ...state,
    deleteTodo: { ...state.deleteTodo, error: false, loading: false },
  };
};

const deleteFail = (state, payload) => {
  return { ...state, deleteTodo: { ...state.deleteTodo, error: payload } };
};

const cleanUpTodos = state => {
  return {
    ...state,
    error: null,
    loading: false,
    deleteTodo: { ...state.deleteTodo, error: null, loading: false },
  };
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO_START:
      return addStart(state);

    case actionTypes.ADD_TODO_SUCCESS:
      return addSuccess(state);

    case actionTypes.ADD_TODO_FAIL:
      return addFail(state, action.payload);

    case actionTypes.DELETE_TODO_START:
      return deleteStart(state);

    case actionTypes.DELETE_TODO_SUCCESS:
      return deleteSuccess(state);

    case actionTypes.DELETE_TODO_FAIL:
      return deleteFail(state, action.payload);

    case actionTypes.CLEAN_UP_TODOS:
      return cleanUpTodos(state);

    default:
      return state;
  }
};
