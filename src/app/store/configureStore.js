import {createStore} from 'redux';
import rootReducer from '../reducer/rootReducer';

export const configureStore = () => {
  const store = createStore(rootReducer);

  return store;
}
