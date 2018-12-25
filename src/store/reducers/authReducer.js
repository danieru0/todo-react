const initState = {
    authLoginError: null,
    authRegisterError: null,
    authSignOut: null,
}

const AuthReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN_ERROR':
            return {
                ...state,
                authLoginError: action.err.message
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authLoginError: null
            }
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authRegisterError: null
            }
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authRegisterError: action.err.message
            }
        case 'SIGNOUT_SUCCESS':
            return {
                ...state,
                authSignOut: Date.now().toString(36) + Math.random().toString(36).substr(2)
            }
        default:
            return state;
    }
}

export default AuthReducer;