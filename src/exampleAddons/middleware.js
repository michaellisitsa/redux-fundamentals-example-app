export const print1 = (storeAPI) => (next) => (action) => {
  console.log('1')
  return next(action)
}

export const print2 = (storeAPI) => (next) => (action) => {
  console.log('2')
  return next(action)
}

export const print3 = (storeAPI) => (next) => (action) => {
  console.log('3')
  return next(action)
}

// The nested functions is used for Redux internals.

// https://redux.js.org/tutorials/fundamentals/part-4-store#writing-custom-middleware
// TODO: middleware itself. called by applyMiddleware from redux.
// storeAPI is just {dispatch, getState} destructured
// if you call dispatch, it will send action to start of the middleware pipeline.
// Only called once.
export function exampleMiddleware(storeAPI) {
  // Next middleware in the pipeline
  // if last in the sequence, then `next` is actually the original store.dispatch
  // calling `next(action) passes middlware to the next middleware in the pipeline.
  // that call is made in the last nested function.
  // Only called once.
  return function wrapDispatch(next) {
    // receives current action and will be called on every dispatch
    return function handleAction(action) {
      console.log('dispatching', action)
      let result = next(action)
      console.log('next state', storeAPI.getState())
      return result
    }
  }
}
