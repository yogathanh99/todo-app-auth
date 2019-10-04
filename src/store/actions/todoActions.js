import * as actionTypes from './actionTypes';

export const addTodo = data => async (dispatch, getState, { getFirestore }) => {
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
          todos: [newTodo],
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
    return true;
  } catch (err) {
    dispatch({ type: actionTypes.ADD_TODO_FAIL, payload: err.message });
  }
};

export const deleteTodo = (id, data) => async (
  dispatch,
  getState,
  { getFirestore },
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actionTypes.DELETE_TODO_START });

  try {
    const res = await firestore
      .collection('todos')
      .doc(userId)
      .get();

    const prevTodos = res.data().todos;
    const newTodo = prevTodos.filter(todo => todo.id !== id);

    await firestore
      .collection('todos')
      .doc(userId)
      .update({ todos: newTodo });

    dispatch({ type: actionTypes.DELETE_TODO_SUCCESS });
    return true;
  } catch (err) {
    dispatch({ type: actionTypes.DELETE_TODO_FAIL, payload: err.message });
  }
};

export const cleanUpTodos = () => ({ type: actionTypes.CLEAN_UP_TODOS });
