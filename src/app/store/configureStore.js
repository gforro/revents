import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../reducer/rootReducer';
import {composeWithDevTools, devToolsEnhancer} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export const configureStore = () => {
  const middlewares = [thunk];
  const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, composedEnhancer);

  return store;
}
