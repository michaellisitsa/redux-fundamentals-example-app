const initialState = []

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

// Selector to be used in useSelector
export const selectTodoById = (state, id) =>
  state.todos.find((todo) => todo.id === id)

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded':
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload,
          completed: false,
          color: '',
        },
      ]

    case 'todos/todoToggled':
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    case 'todos/colorSelected':
      return state.map((todo) => {
        if (todo.id !== action.payload.todoId) {
          return todo
        }

        return {
          ...todo,
          color: action.payload.color,
        }
      })
    case 'todos/todoDeleted':
      break
    case 'todos/todoCompleted':
      break
    case 'todos/completedCleared':
      break
    default:
      return state
  }
}
