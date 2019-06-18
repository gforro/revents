import {closeModal} from '../modals/modalActions';
import {SubmissionError, reset} from 'redux-form';
import {toastr} from 'react-redux-toastr';

export const login = (creds) => {
  return async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    try {
      await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal())
    } catch (error) {
      throw new SubmissionError({
        _error: error
      });
    }
  }
};

export const register = user => async (dispatch, getState, {getFirebase, getFirestore}) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  try {
    const userCredentials = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    await userCredentials.user.updateProfile({displayName: user.displayName});

    const newProfile = {
      displayName: user.displayName,
      createdAt: firestore.FieldValue.serverTimestamp()
    };
    await firestore.set(`users/${userCredentials.user.uid}`, {...newProfile});
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
    throw new SubmissionError({_error: error.message});
  }
}

export const socialLogin = provider => async (dispatch, getState, {getFirebase, getFirestore}) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    dispatch(closeModal());
    const user = await firebase.login({
      provider: provider,
      type: 'popup'
    });
    if (user.additionalUserInfo.isNewUser) {
      firestore.set(`users/${user.user.uid}`, {
        displayName: user.profile.displayName,
        photoURL: user.profile.avatarUrl,
        createdAt: firestore.FieldValue.serverTimestamp()
      });
    }
    console.log(user);
  } catch (error) {
    console.log(error)
  }
}

export const changePassword = cred =>
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;

    try {
      await user.updatePassword(cred.newPassword1);
      await dispatch(reset('account'));
      toastr.success('Success', 'Your password has been updated');
    } catch (error) {
      throw new SubmissionError({_error: error.message});
    }
  }
