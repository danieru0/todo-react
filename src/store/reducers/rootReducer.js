import authReducer from './authReducer';
import todoRecuder from './todoReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    todo: todoRecuder
})

export default rootReducer;