const initialState = {
  status: 'All',
  colors: [],
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'filters/statusFilterChanged':
      return {
        ...state,
        status: action.payload,
      }
    case 'filters/colorFilterChanged':
      break
    default:
      return state
  }
}
