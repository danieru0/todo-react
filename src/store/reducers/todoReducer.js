const initState = {
    todos: null,
    todoUpdated: false,
    todoAdded: false,
    todoRemoved: false,
    descriptionChange: null,
    snackbar: null,
    message: null
}

const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_TODO':
            return {
                ...state,
                todoAdded: true,
                snackbar: Date.now().toString(36) + Math.random().toString(36).substr(2), //this tells me that something changed (i'm using this for notifications)
                message: 'Todo has beed added!'
            }
        case 'CREATE_TODO_ERROR':
            console.log('created todo error');
            break;
        case 'GET_TODO_ALL':
            return {
                ...state,
                todos: action.data
            }
        case 'UPDATE_TODO':
            return {
                ...state,
                todoUpdated: true
            }
        case 'UPDATE_DESCRIPTION':
            return {
                ...state,
                descriptionChange: Date.now().toString(36) + Math.random().toString(36).substr(2),
                message: 'Description has been saved!'
            }
        case 'REMOVE_TODO':
            return {
                ...state,
                todoRemoved: true,
                snackbar: Date.now().toString(36) + Math.random().toString(36).substr(2),
                message: 'Todo has beed removed!'
            }
        default: break;
    }
    return state
}

export default todoReducer;