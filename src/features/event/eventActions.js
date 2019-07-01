import {toastr} from 'react-redux-toastr';
import {createNewEvent} from '../../app/common/util/helpers';

export const createEvent = (event) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const userPhotoURL = getState().firebase.profile.photoURL;
    const newEvent = createNewEvent(user, userPhotoURL, event);
    try {
      const createdEvent = await firestore.add('/events', newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      });
      toastr.success('Success', 'Event has been created');
      return createdEvent
    } catch (error) {
      console.log(error);
      toastr.error('Oops', 'Something went wrong');
    }
  };
}

export const updateEvent = (event) => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    try {
      await firestore.update(`/events/${event.id}`, event);
      toastr.success('Success!', 'Event has been successfully updated.');
    } catch (error) {
      console.log(error);
      toastr.error('Oops', 'Something went wrong when updating event');
    }

  };
}

export const cancelToggleEvent = (cancelled, eventId) => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    try {
      await firestore.update(`/events/${eventId}`, {cancelled: cancelled});
    } catch (error) {
      console.log(error);
      toastr.error('Oops', 'Something went wrong when updating event');
    }

  };
}
