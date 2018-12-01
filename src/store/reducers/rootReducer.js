import authReducer from './authReducer';
import todoRecuder from './todoReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    todo: todoRecuder,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;