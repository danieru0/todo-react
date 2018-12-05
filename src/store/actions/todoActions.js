export const createTodo = (todo) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged((user) => {
            firestore.collection('users').doc(user.uid).set({
                todos: {
                    [todo.date]: firebase.firestore.FieldValue.arrayUnion({
                        [todo.id]: {
                            date: todo.date,
                            todo: todo.todo,
                            finished: false,
                            time: todo.time
                        }
                    })
                }
            }, { merge: true });
        })
    }
}

export const getAllTodo = (time) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged((user) => {
            firestore.collection('users').doc(user.uid).get().then((doc) => {
                dispatch({ type: 'GET_TODO_ALL', data: doc.data() })
            });
        });
    }
}

export const updateTodo = (todo) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged((user) => {
            firestore.collection('users').doc(user.uid).set({
                todos: {
                    [todo.date]: firebase.firestore.FieldValue.arrayUnion({
                        [todo.id]: {
                            date: todo.date,
                            todo: todo.todo,
                            finished: true,
                            time: todo.time
                        }
                    })
                }
            })
        })
    }
}