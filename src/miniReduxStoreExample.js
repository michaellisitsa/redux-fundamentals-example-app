export function createStore(reducer, preloadedState) {
  let state = preloadedState
  // A listener is something that will mutate the DOM when a store change occurs
  // It could simply be a console log function.
  const listeners = []

  // because this returns state (and not a copy of state)
  // you can then mutate state unintentionally.
  // see https://redux.js.org/tutorials/fundamentals/part-4-store#inside-a-redux-store
  function getState() {
    return state
  }

  function subscribe(listener) {
    listeners.push(listener)
    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  function dispatch(action) {
    state = reducer(state, action)
    // Here any listeners (e.g. console.log, or a DOM mutation)
    // will be run when the state changes.
    // If you want to reveal what changed (at least in this barebones implementation)
    // You have to manually program it into each listener
    listeners.forEach((listener) => listener())
  }

  dispatch({ type: '@@redux/INIT' })

  return { dispatch, subscribe, getState }
}
