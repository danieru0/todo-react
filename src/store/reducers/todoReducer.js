const initState = {
    todos: null,
    updated: false,
    todoAdded: false

}

const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_TODO':
            return {
                ...state,
                todoAdded: true
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
                updated: true
            }
        default: break;
    }
    return state
}

export default todoReducer;