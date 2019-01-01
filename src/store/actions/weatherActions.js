export const getWeather = (city) => {
    return (dispatch, getState) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=1b219e54535ffe5f5a6a4442ea878ed2`)
            .then(resp => resp.json())
            .then(resp => {
                dispatch({  type: 'WEATHER_SUCCESS', resp });
            });
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