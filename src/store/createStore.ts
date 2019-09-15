import { createStore, compose, applyMiddleware, Reducer, Action } from 'redux';
import { SagaMiddleware } from 'redux-saga';

export default (
  reducers: Reducer<any, Action<any>>,
  middlewares: SagaMiddleware<Object>[]
) => {
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(
          console.tron.createEnhancer(),
          applyMiddleware(...middlewares)
        )
      : applyMiddleware(...middlewares);
  return createStore(reducers, enhancer);
};
