import React from 'react';
import {Grid, Segment} from "semantic-ui-react";
import {connect} from 'react-redux';
import UserBasics from './UserBasics';
import UserDetails from './UserDetails';
import Photos from './Photos';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import UserDetailedSidebar from './UserDetailedSidebar';
import Events from './Events';

const UserDetailedPage = ({profile, photos}) => {
    const isPrepared = profile.isLoaded && !profile.isEmpty;

    return (
      <>
      {isPrepared &&
      <Grid>
        <Grid.Column width={16}>
          <UserBasics profile={profile}/>
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment>
            <UserDetails profile={profile}/>
          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment>
            <UserDetailedSidebar />
          </Segment>
        </Grid.Column>
        {photos && photos.length > 0 && (
          <Grid.Column width={12}>
            <Segment attached>
              <Photos photos={photos}/>
            </Segment>
          </Grid.Column>
        )}
        <Grid.Column width={12}>
          <Segment attached>
            <Events />
          </Segment>
        </Grid.Column>
      </Grid>}
      </>
    );
  }

const mapState = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  photos: state.firestore.ordered.photos
});

export default compose(
  connect(mapState),
  firestoreConnect(({auth}) => [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{collection: 'photos'}],
      storeAs: 'photos'
    }
  ])
)(UserDetailedPage);
