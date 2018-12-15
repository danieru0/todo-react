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
            }, { merge: true }).then(() => {
                dispatch({ type: 'CREATE_TODO' });
            });
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
            let databaseRef = firestore.collection('users').doc(user.uid);
            firestore.runTransaction(transaction => {
                return transaction.get(databaseRef).then(doc => {
                    let todos = doc.data().todos;
                    todos[todo.todo.date].map((item) => {
                        let todoItem = item[todo.todo.id];
                        return (
                            todoItem ? todoItem.finished = todo.finished : null
                        )
                    })
                    transaction.update(databaseRef, { todos: todos });
                }).then(() => {
                    dispatch({ type: 'UPDATE_TODO' });
                })
            });
        })
    }
}