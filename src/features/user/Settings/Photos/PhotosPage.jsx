import React, {Component} from 'react';
import {Image, Segment, Header, Divider, Grid, Button, Card, ButtonGroup} from 'semantic-ui-react';
import DropzoneInput from './DropzoneInput';
import CropperInput from './CropperInput';
import {deleteProfileImage, setMainProfileImage, uploadProfileImage} from '../../userActions';
import {connect} from 'react-redux';
import {toastr} from 'react-redux-toastr';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import UserPhotos from './UserPhotos';

const PhotosPage = ({uploadProfileImage, deleteProfileImage, setMainProfileImage, profile, photos, loading}) => {
  const [files, setFiles] = React.useState([]);
  const [image, setImage] = React.useState(null);

  React.useEffect(() =>
    () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
      console.log('cleaned up for files', files);
    }, [files]);

  const handleUploadImage = async () => {
    try {
      await uploadProfileImage(image, files[0].name);
      handleCancelCrop();
      toastr.success('Success', 'Photo has been uploaded');
    } catch (error) {
      console.log(error);
      toastr.error('Oops', 'Something went wrong');
    }
  };

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
  };

  const handleDeleteProfileImage = async (photo) => {
    try {
      await deleteProfileImage(photo);
    } catch (error) {
      toastr.error('Oops', error.message);
    }
  };

  const handleSetMainProfileImage = async (photo) => {
    try {
      await setMainProfileImage(photo);
    } catch (error) {
      toastr.error('Oops', error.message);
    }
  };

  return (
    <Segment>
      <Header dividing size='large' content='Your Photos'/>
      <Grid>
        <Grid.Row/>
        <Grid.Column width={4}>
          <Header color='teal' sub content='Step 1 - Add Photo'/>
          <DropzoneInput setFiles={setFiles}/>
        </Grid.Column>
        <Grid.Column width={1}/>
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 2 - Resize image'/>
          {files.length > 0 && <CropperInput imagePreview={files[0].preview} setImage={setImage}/>}
        </Grid.Column>
        <Grid.Column width={1}/>
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 3 - Preview and Upload'/>
          {files.length > 0 &&
          <>
            <div id="image-preview" style={{minWidth: '200px', minHeight: '200px', overflow: 'hidden'}}></div>
            <ButtonGroup>
              <Button loading={loading} onClick={handleUploadImage} positive icon="check" style={{width: '100px'}}/>
              <Button disabled={loading} onClick={handleCancelCrop} icon="close" style={{width: '100px'}}/>
            </ButtonGroup>
          </>}
        </Grid.Column>

      </Grid>

      <Divider/>
      <UserPhotos profile={profile} photos={photos} deleteImage={handleDeleteProfileImage} setMainImage={handleSetMainProfileImage} />
    </Segment>
  );
}

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  loading: state.async.loading
});
const actions = {
  uploadProfileImage,
  deleteProfileImage,
  setMainProfileImage
};

const query = ({auth}) => ([
  {
    collection: 'users',
    doc: auth.uid,
    subcollections: [{collection: 'photos'}],
    storeAs: 'photos',
  }
]);

export default compose(
  connect(mapState, actions),
  firestoreConnect(props => query(props))
)(PhotosPage);
