import {createReducer} from '../../app/common/util/reducerUtils';
import {CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT} from './eventConstants';

const initialState = [];

const createEvent = (state, payload) => {
  return [...state, payload.event];
}

const updateEvent = (state, payload) => {
  return state.map(e => {
    if (e.id === payload.event.id) {
      return {
        ...e,
        ...payload.event
      }
    } else {
      return e;
    }
  });
}

const fetchEvents = (state, payload) => {
  return payload.events;
}


const deleteEvent = (state, payload) => state.filter(e => e.id !== payload.eventId);

export default createReducer(initialState, {
  [CREATE_EVENT]: createEvent,
  [UPDATE_EVENT]: updateEvent,
  [DELETE_EVENT]: deleteEvent,
  [FETCH_EVENTS]: fetchEvents
});


