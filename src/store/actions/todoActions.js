export const createTodo = (todo) => {
    return (dispatch, getState) => {
        dispatch({ type: 'CREATE_TODO', todo: todo });
    }
}