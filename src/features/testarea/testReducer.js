import {DECREMENT_COUNTER, INCREMENT_COUNTER} from './testConstants';
import {createReducer} from '../../app/common/util/reducerUtils';

const initialState = {
  data: 42
};

const incrementCounter = (state) => ({...state, data: state.data + 1});

const decrementCounter = (state) => ({...state, data: state.data - 1});

export default createReducer(initialState, {
  [INCREMENT_COUNTER]: incrementCounter,
  [DECREMENT_COUNTER]: decrementCounter
});
