const initState = {
    projects: [
        {id: 1, 'title': 'ass'},
        {id: 2, 'title': 'elo'}
    ]
}

const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_TODO':
            console.log('created todo', action.todo)
            break;
        default: break;
    }
    return state
}

export default todoReducer;