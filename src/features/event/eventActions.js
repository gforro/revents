import {CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT} from './eventConstants';
import {asyncActionEnd, asyncActionError, asyncActionStart} from '../async/asyncActions';
import {fetchSampleData} from '../../app/data/mockApi';
import {toastr} from 'react-redux-toastr';

export const createEvent = (event) => {
  return async dispatch => {
    dispatch({
      type: CREATE_EVENT,
      payload: {
        event
      }
    });
    toastr.success('Success!', 'Event has been successfully created.');
  };
}

export const updateEvent = (event) => {
  return async dispatch => {
    dispatch({
      type: UPDATE_EVENT,
      payload: {
        event
      }
    });
    toastr.success('Success!', 'Event has been successfully updated.');
  };
}

export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  };
}

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const events = await fetchSampleData();
      dispatch({type: FETCH_EVENTS, payload: {events}})
      dispatch(asyncActionEnd());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  }
}
