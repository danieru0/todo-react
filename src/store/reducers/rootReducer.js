import authReducer from './authReducer';
import todoRecuder from './todoReducer';
import userReducer from './userReducer';
import weatherReducer from './weatherReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    todo: todoRecuder,
    user: userReducer,
    weather: weatherReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;