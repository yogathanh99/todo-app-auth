import * as actionTypes from '../actions/actionTypes';

const initState = {
  error: null,
  loading: false,
  verifyEmail: {
    error: null,
    loading: false,
  },
  recoverPassword: {
    error: null,
    loading: false,
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, loading: true };
    case actionTypes.AUTH_END:
      return { ...state, loading: false };
    case actionTypes.AUTH_FAIL:
      return { ...state, error: action.payload };
    case actionTypes.AUTH_SUCCESS:
      return { ...state, error: false };
    case actionTypes.CLEAN_UP:
      return {
        ...state,
        error: null,
        loading: false,
        verifyEmail: { ...state.verifyEmail, loading: false, error: null },
        recoverPassword: {
          ...state.recoverPassword,
          loading: false,
          error: null,
        },
      };
    case actionTypes.VERIFY_START:
      return { ...state, verifyEmail: { ...state.verifyEmail, loading: true } };
    case actionTypes.VERIFY_SUCCESS:
      return {
        ...state,
        verifyEmail: { ...state.verifyEmail, loading: false, error: false },
      };
    case actionTypes.VERIFY_FAIL:
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          loading: false,
          error: action.payload,
        },
      };
    case actionTypes.VERIFY_END:
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          loading: false,
        },
      };
    case actionTypes.RECOVER_START:
      return {
        ...state,
        recoverPassword: {
          ...state.recoverPassword,
          loading: true,
        },
      };
    case actionTypes.RECOVER_SUCCESS:
      return {
        ...state,
        recoverPassword: {
          ...state.recoverPassword,
          loading: false,
          error: false,
        },
      };
    case actionTypes.RECOVER_FAIL:
      return {
        ...state,
        recoverPassword: {
          ...state.recoverPassword,
          loading: false,
          error: action.payload,
        },
      };
    case actionTypes.RECOVER_END:
      return {
        ...state,
        recoverPassword: {
          ...state.recoverPassword,
          loading: false,
        },
      };
    default:
      return state;
  }
};
