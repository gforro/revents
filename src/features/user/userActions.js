import {SubmissionError} from 'redux-form';
import {toastr} from 'react-redux-toastr';

export const updateProfile = (user) =>
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    try {
      const {isLoaded, isEmpty, ...updatedUser} = user;
      await firebase.updateProfile(updatedUser);
      toastr.success('Success', 'Your profile has been successfully updated');
    } catch (error) {
      console.log(error);
      throw new SubmissionError();
    }
  }
