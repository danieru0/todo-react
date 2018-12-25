export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then((resp) =>{
            firestore.collection('users').doc(resp.user.uid).set({
                full_name: newUser.name,
                email: newUser.email,
                todos: {},
                background: 'https://react-materialize.github.io/img/office.jpg',
                avatar: 'https://react-materialize.github.io/img/yuna.jpg'
            }).then(() => {
                dispatch({ type: 'SIGNUP_SUCCESS' })
            });
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}
export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' });
        });
    }
}