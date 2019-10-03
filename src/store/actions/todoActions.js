import * as actionTypes from './actionTypes';

export const addTodo = data => async (
  dispatch,
  getState,
  { _, getFirestore },
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actionTypes.ADD_TODO_START });

  try {
    const res = await firestore
      .collection('todos')
      .doc(userId)
      .get();

    const newTodo = {
      id: new Date().valueOf(),
      todo: data.todo,
    };

    if (!res.data()) {
      await firestore
        .collection('todos')
        .doc(userId)
        .set({
          todos: newTodo,
        });
    } else {
      await firestore
        .collection('todos')
        .doc(userId)
        .update({
          todos: [...res.data().todos, newTodo],
        });
    }
    dispatch({ type: actionTypes.ADD_TODO_SUCCESS });
  } catch (err) {
    dispatch({ type: actionTypes.ADD_TODO_FAIL, payload: err.message });
  }
  dispatch({ type: actionTypes.ADD_TODO_END });
};
