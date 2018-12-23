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
                        })
                    });
                });
            }
            if (images.background) {
                firebase.storage().ref().child('backgrounds/'+user.uid).put(images.background).then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((url) => {
                        firestore.collection('users').doc(user.uid).update({
                            background: url
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
                    console.log('changed!');
                }).catch(() => {
                    console.log('something went wrong!');
                })
            }).catch(() => {
                console.log('Old password problem')
            });
        })
    }
}