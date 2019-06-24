import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../reducer/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {getFirebase, reactReduxFirebase} from 'react-redux-firebase';
import {getFirestore, reduxFirestore} from 'redux-firestore';
import firebase from '../config/firebase';

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false
};

export const configureStore = () => {
  const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];
  const composedEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  );
  const store = createStore(rootReducer, composedEnhancer);

  return store;
}
