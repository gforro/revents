import {createReducer} from '../../app/common/util/reducerUtils';
import {ASYNC_ACTION_END, ASYNC_ACTION_ERROR, ASYNC_ACTION_START} from './asyncConstants';

const initialState = {
  loading: false
}

const asyncStart = (state) => {
  return {
    ...state,
    loading: true
  }
}

const asyncEnd = (state) => {
  return {
    ...state,
    loading: false
  }
}

const asyncError = (state) => {
  return {
    ...state,
    loading: false
  }
}

export default createReducer(initialState, {
  [ASYNC_ACTION_START]: asyncStart,
  [ASYNC_ACTION_END]: asyncEnd,
  [ASYNC_ACTION_ERROR]: asyncError
})
