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
  profileEdit: {
    error: null,
    loading: false,
  },
};

const cleanUp = state => {
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
    profileEdit: {
      ...state.profileEdit,
      loading: false,
      error: null,
    },
  };
};

const authStart = state => {
  return { ...state, loading: true };
};

const authEnd = state => {
  return { ...state, loading: false };
};

const authFail = (state, payload) => {
  return { ...state, error: payload };
};

const authSuccess = state => {
  return { ...state, error: false };
};

const verifyStart = state => {
  return { ...state, verifyEmail: { ...state.verifyEmail, loading: true } };
};

const verifyEnd = state => {
  return {
    ...state,
    verifyEmail: {
      ...state.verifyEmail,
      loading: false,
    },
  };
};

const verifyFail = (state, payload) => {
  return {
    ...state,
    verifyEmail: {
      ...state.verifyEmail,
      loading: false,
      error: payload,
    },
  };
};

const verifySuccess = state => {
  return {
    ...state,
    verifyEmail: { ...state.verifyEmail, loading: false, error: false },
  };
};

const recoverStart = state => {
  return {
    ...state,
    recoverPassword: {
      ...state.recoverPassword,
      loading: true,
    },
  };
};

const recoverEnd = state => {
  return {
    ...state,
    recoverPassword: {
      ...state.recoverPassword,
      loading: false,
    },
  };
};

const recoverFail = (state, payload) => {
  return {
    ...state,
    recoverPassword: {
      ...state.recoverPassword,
      loading: false,
      error: payload,
    },
  };
};

const recoverSuccess = state => {
  return {
    ...state,
    recoverPassword: {
      ...state.recoverPassword,
      loading: false,
      error: false,
    },
  };
};

const editStart = state => {
  return {
    ...state,
    profileEdit: {
      ...state.profileEdit,
      loading: true,
      error: null,
    },
  };
};

const editEnd = state => {
  return {
    ...state,
    profileEdit: {
      ...state.profileEdit,
      loading: false,
    },
  };
};

const editFail = (state, payload) => {
  return {
    ...state,
    profileEdit: {
      ...state.profileEdit,
      loading: false,
      error: payload,
    },
  };
};

const editSuccess = state => {
  return {
    ...state,
    profileEdit: {
      ...state.profileEdit,
      loading: false,
      error: false,
    },
  };
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);

    case actionTypes.AUTH_END:
      return authEnd(state);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action.payload);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state);

    case actionTypes.CLEAN_UP:
      return cleanUp(state);

    case actionTypes.VERIFY_START:
      return verifyStart(state);

    case actionTypes.VERIFY_SUCCESS:
      return verifySuccess(state);

    case actionTypes.VERIFY_FAIL:
      return verifyFail(state, action.payload);

    case actionTypes.VERIFY_END:
      return verifyEnd(state);

    case actionTypes.RECOVER_START:
      return recoverStart(state);

    case actionTypes.RECOVER_SUCCESS:
      return recoverSuccess(state);

    case actionTypes.RECOVER_FAIL:
      return recoverFail(state, action.payload);

    case actionTypes.RECOVER_END:
      return recoverEnd(state);

    case actionTypes.EDIT_START:
      return editStart(state);

    case actionTypes.EDIT_SUCCESS:
      return editSuccess(state);

    case actionTypes.EDIT_FAIL:
      return editFail(state, action.payload);

    case actionTypes.EDIT_END:
      return editEnd(state);

    default:
      return state;
  }
};
