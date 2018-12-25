export const createTodo = (todo) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firestore.collection('users').doc(user.uid).set({
                    todos: {
                        [todo.date]: firebase.firestore.FieldValue.arrayUnion({
                            [todo.id]: {
                                date: todo.date,
                                todo: todo.todo,
                                finished: false,
                                time: todo.time,
                                description: ''
                            }
                        })
                    }
                }, { merge: true }).then(() => {
                    dispatch({ type: 'CREATE_TODO' });
                });
            }
        })
    }
}

export const getAllTodo = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firestore.collection('users').doc(user.uid).get().then((doc) => {
                    dispatch({ type: 'GET_TODO_ALL', data: doc.data() })
                });
            }
        });
    }
}

export const updateTodo = (todo) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let databaseRef = firestore.collection('users').doc(user.uid);
                firestore.runTransaction(transaction => {
                    return transaction.get(databaseRef).then(doc => {
                        let todos = doc.data().todos;
                        todos[todo.todo.date].map((item) => {
                            let todoItem = item[todo.todo.id];
                            if (todo.finished) {
                                return (
                                    todoItem ? todoItem.finished = todo.finished : null
                                )
                            } else {
                                return (
                                    todoItem ? todoItem.description = todo.todo.description : null
                                )
                            }
                        })
                        transaction.update(databaseRef, { todos: todos });
                    }).then(() => {
                        dispatch({ type: 'UPDATE_TODO' });
                    })
                });
            }
        })
    }
}

export const removeTodo = (todo) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let databaseRef = firestore.collection('users').doc(user.uid);
                firestore.runTransaction(transaction => {
                    return transaction.get(databaseRef).then(doc => {
                        let todos = doc.data().todos;
                        let newTodoArray = [];
                        todos[todo.date].map(item => {
                            if (Object.keys(item).toString() !== todo.id) {
                                newTodoArray.push(item);
                            }
                            return '';
                        });
                        todos[todo.date] = newTodoArray;
                        transaction.update(databaseRef, { todos: todos });
                    });
                }).then(() => {
                    dispatch({ type: 'REMOVE_TODO' });
                });
            }
        });
    }
}