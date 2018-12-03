export const createTodo = (todo) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged((user) => {
            firestore.collection('users').doc(user.uid).collection('todos').doc(todo.date).set({
                [todo.id]: {
                    date: todo.date,
                    todo: todo.todo,
                    finished: false,
                    time: todo.time
                }
            }, { merge: true });
        })
    }
}