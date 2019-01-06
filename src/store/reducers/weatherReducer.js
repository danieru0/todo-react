const initState = {
    weatherUpdate: null,
    weatherData: null
}

const weatherReducer = (state = initState, action) => {
    switch(action.type) {
        case 'WEATHER_SUCCESS':
            return {
                ...state,
                weatherUpdate: Date.now().toString(36) + Math.random().toString(36).substr(2),
                weatherData: action
            }
        case 'WEATHER_ERROR':
            return {
                ...state,
                weatherUpdate: Date.now().toString(36) + Math.random().toString(36).substr(2),
                weatherData: action
            }
        default: return state;
    }
}

export default weatherReducer;