export const getWeather = (city) => {
    return (dispatch, getState) => {
        if (city !== 'Undefined') {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=1b219e54535ffe5f5a6a4442ea878ed2`)
                .then(resp => {
                    if (resp.ok) {
                        if (!resp.cod) {
                            return resp.json();
                        } else {
                            throw new Error('limit');
                        }
                    } else {
                        throw new Error(resp.status);
                    }
                })
                .then(resp => {
                    dispatch({  type: 'WEATHER_SUCCESS', resp });
                }).catch((err) => {
                    if (err.message === '404') {
                        dispatch({  type: 'WEATHER_ERROR', err: 'No city found!' });
                    }
                    if (err === 'limit') {
                        dispatch({  type: 'WEATHER_ERROR', err: 'API LIMIT!' });
                    }
                });
        } else {
            dispatch({ type: 'WEATHER_ERROR', err: 'Add your city' })
        }
    };
}

export const updateCity = (city) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged((user) => {
             firestore.collection('users').doc(user.uid).update({
                 city: city
             })
        });
    }
}