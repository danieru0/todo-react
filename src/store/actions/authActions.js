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

        firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then((createdUser) =>{
            fetch('https://api.ipdata.co/city?api-key=199538747555b9883ca365cadbff8af8e21d2f7e5b06a6bcb4605a3c')
                .then(resp => resp.text())
                .then(resp => {
                    firestore.collection('users').doc(createdUser.user.uid).set({
                        full_name: newUser.name,
                        email: newUser.email,
                        todos: {},
                        background: 'https://react-materialize.github.io/img/office.jpg',
                        avatar: 'https://react-materialize.github.io/img/yuna.jpg',
                        city: resp
                    }).then(() => {
                        dispatch({ type: 'SIGNUP_SUCCESS' })
                    });
                })
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