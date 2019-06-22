import {SubmissionError} from 'redux-form';
import {toastr} from 'react-redux-toastr';
import {asyncActionEnd, asyncActionError, asyncActionStart} from '../async/asyncActions';
import cuid from 'cuid';

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

export const uploadProfileImage = (file, fileName) =>
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const imagesPath = `${user.uid}/user_images`;
    const imageName = cuid();
    const options = {
      name: imageName
    };

    try {
      dispatch(asyncActionStart());
      const uploadedFile = await firebase.uploadFile(imagesPath, file, null, options);
      const downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
      const userDoc = await firestore.get(`users/${user.uid}`);

      if (!userDoc.data().photoURL) {
        await firebase.updateProfile({
          photoURL: downloadURL
        });
        // this is not needed as we do not user the profile under auth
        await user.updateProfile({
          photoURL: downloadURL
        });
      }
      await firestore.add({
        collection: 'users',
        doc: user.uid,
        subcollections: [{collection: 'photos'}]
      }, {
        name: imageName,
        url: downloadURL,
        origin: fileName
      });
      dispatch(asyncActionEnd());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  }

export const deleteProfileImage = (photo) =>
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;

    try {
      const xxx = await firestore.delete({
        collection: 'users',
        doc: user.uid,
        subcollections: [{collection: 'photos', doc: photo.id}]
      });
      const yyy = await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
      console.log('done');
    } catch (error) {
      console.log(error);
      throw new Error('Image not deleted. Problem when deleting.')
    }
  }

export const setMainProfileImage = (photo) =>
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    try {
      const xxx = await firebase.updateProfile({photoURL: photo.url});
      console.log('done');
    } catch (error) {
      console.log(error);
      throw new Error('Error when set photo to main profile.');
    }
  }
