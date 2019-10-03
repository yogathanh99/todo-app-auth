import * as actionTypes from './actionTypes';

//signUp actions
export const signUp = data => async (
  dispatch,
  _,
  { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  dispatch({ type: actionTypes.AUTH_START });

  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password);

    const user = firebase.auth().currentUser;
    await user.sendEmailVerification();

    await firestore
      .collection('users')
      .doc(res.user.uid)
      .set({
        firstName: data.firstName,
        lastName: data.lastName,
      });
    dispatch({ type: actionTypes.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: actionTypes.AUTH_FAIL, payload: err.message });
  }
  dispatch({ type: actionTypes.AUTH_END });
};

//logOut actions
export const logOut = () => async (dispatch, _, { getFirebase }) => {
  const firebase = getFirebase();
  try {
    await firebase.auth().signOut();
  } catch (err) {
    dispatch({ type: actionTypes.AUTH_FAIL, payload: err.message });
  }
};

//logIn actions
export const logIn = data => async (dispatch, _, { getFirebase }) => {
  const firebase = getFirebase();
  dispatch({ type: actionTypes.AUTH_START });
  try {
    await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    dispatch({ type: actionTypes.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: actionTypes.AUTH_FAIL, payload: err.message });
  }
  dispatch({ type: actionTypes.AUTH_END });
};

//cleanUp actions
export const cleanUp = () => ({ type: actionTypes.CLEAN_UP });

//verifyEmail actions
export const verifyEmail = data => async (dispatch, _, { getFirebase }) => {
  const firebase = getFirebase();
  dispatch({ type: actionTypes.VERIFY_START });
  try {
    const user = firebase.auth().currentUser;
    await user.sendEmailVerification();
    dispatch({ type: actionTypes.VERIFY_SUCCESS });
  } catch (err) {
    dispatch({ type: actionTypes.VERIFY_FAIL, payload: err.message });
  }
  dispatch({ type: actionTypes.VERIFY_END });
};

//recoverPassword actions
export const recoverPassword = data => async (dispatch, _, { getFirebase }) => {
  const firebase = getFirebase();
  dispatch({ type: actionTypes.RECOVER_START });
  try {
    await firebase.auth().sendPasswordResetEmail(data.email);
    dispatch({ type: actionTypes.RECOVER_SUCCESS });
  } catch (err) {
    dispatch({ type: actionTypes.RECOVER_FAIL, payload: err.message });
  }
  dispatch({ type: actionTypes.RECOVER_END });
};

//editProfile actions
export const editProfile = data => async (
  dispatch,
  getState,
  { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const { uid: userId, email: userEmail } = getState().firebase.auth;
  dispatch({ type: actionTypes.EDIT_START });

  try {
    if (userEmail !== data.email) {
      await user.updateEmail(data.email);
    }

    await firestore
      .collection('users')
      .doc(userId)
      .set({
        firstName: data.firstName,
        lastName: data.lastName,
      });

    if (data.password.length > 0) {
      await user.updatePassword(data.password);
    }
    dispatch({ type: actionTypes.EDIT_SUCCESS });
  } catch (err) {
    dispatch({ type: actionTypes.EDIT_FAIL, payload: err.message });
  }
  dispatch({ type: actionTypes.EDIT_END });
};
