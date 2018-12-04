const initState = {
    todos: null
}

const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_TODO':
            console.log('created todo');
            break;
        case 'CREATE_TODO_ERROR':
            console.log('created todo error');
            break;
        case 'GET_TODO_ALL':
            return {
                ...state,
                todos: action.data
            }
        default: break;
    }
    return state
}

export default todoReducer;