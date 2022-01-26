const initialState = {
  status: 'All',
  colors: [],
}

export const colorFilterChanged = (color, changeType) => {
  return {
    type: 'filters/colorFilterChanged',
    payload: { name: color, checked: changeType },
  }
}

// needs to get just the selected status value.
export const StatusFilters = (state) => state.filters.status
export const ColorFilters = (state) => state.filters.colors

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case 'filters/statusFilterChanged':
      return {
        ...state,
        status: action.payload,
      }
    case 'filters/colorFilterChanged':
      if (action.payload.checked) {
        return {
          ...state,
          colors: [...state.colors, action.payload.name],
        }
      } else {
        return {
          ...state,
          colors: [
            ...state.colors.filter((color) => color !== action.payload.name),
          ],
        }
      }
    default:
      return state
  }
}
