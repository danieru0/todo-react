import authReducer from './authReducer';
import todoRecuder from './todoReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    todo: todoRecuder,
    user: userReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;