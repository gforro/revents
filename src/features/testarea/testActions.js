import {DECREMENT_COUNTER, INCREMENT_COUNTER} from './testConstants';
import {asyncActionEnd, asyncActionError, asyncActionStart} from '../async/asyncActions';

export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER
  }
}

export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER
  }
}

export const incrementAsync = (fail) => {
  return async dispatch => {
    dispatch(asyncActionStart());
    await delay(1000, false);
    dispatch(incrementCounter());
    dispatch(asyncActionEnd());
  }
}

export const decrementAsync = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      await delay(1000, true);
      dispatch(decrementCounter());
      dispatch(asyncActionEnd());
    } catch (error) {
      console.log('### error', error);
      dispatch(asyncActionError());
    }
  }
}

const delay = (ms, fail) => new Promise((resolve, reject) => setTimeout(() => {
  if (fail) {
    reject("error")
  } else {
    resolve();
  }
  }, ms));
