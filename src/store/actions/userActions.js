export const updateImages = (images) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged((user) => {
            if (images.avatar) {
                firebase.storage().ref().child('avatars/'+user.uid).put(images.avatar).then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((url) => {
                        firestore.collection('users').doc(user.uid).update({
                            avatar: url
                        }).then(() => {
                            dispatch({ type: 'AVATAR_SUCCESS' });
                        });
                    });
                });
            }
            if (images.background) {
                firebase.storage().ref().child('backgrounds/'+user.uid).put(images.background).then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((url) => {
                        firestore.collection('users').doc(user.uid).update({
                            background: url
                        }).then(() => {
                            dispatch({ type: 'BACKGROUND_SUCCESS' });
                        })
                    });
                });
            }
        });
    }
}

export const changePassword = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().onAuthStateChanged((user) => {
            let credential = firebase.auth.EmailAuthProvider.credential(
                user.email,
                credentials.oldPassword
            )
            user.reauthenticateWithCredential(credential).then(() => {
                user.updatePassword(credentials.newPassword).then(() => {
                    dispatch({ type: 'PASSWORD_SUCCESS' });
                }).catch((err) => {
                    dispatch({ type: 'PASSWORD_ERROR', err });
                })
            }).catch((err) => {
                dispatch({ type: 'PASSWORD_ERROR', err });
            });
        })
    }
}

export const deleteAccount = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged((user) => {
            firestore.collection('users').doc(user.uid).delete().then(() => {
                user.delete().then(() => {
                    console.log('deleted!');
                }).catch((err) => {
                    console.log(err);
                });
            });
        });
    }
}