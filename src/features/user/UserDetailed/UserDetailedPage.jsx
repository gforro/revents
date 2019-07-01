import React from 'react';
import {Grid, Segment} from "semantic-ui-react";
import {connect} from 'react-redux';
import UserBasics from './UserBasics';
import UserDetails from './UserDetails';
import Photos from './Photos';
import {compose} from 'redux';
import {firestoreConnect, isEmpty} from 'react-redux-firebase';
import UserDetailedSidebar from './UserDetailedSidebar';
import Events from './Events';
import {queryUserDetail} from '../userQueries';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const UserDetailedPage = ({profile, photos, match, auth, requesting}) => {
    const isCurrentUser = match.params.id === auth.uid;
    if (Object.values(requesting).some(a => a)) {
      return <LoadingComponent inverted={true}/>
    }
    return (
      <Grid>
        <Grid.Column width={16}>
          <UserBasics profile={profile} />
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment>
            <UserDetails profile={profile}/>
          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment>
            <UserDetailedSidebar isCurrentUser={isCurrentUser}/>
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
      </Grid>
    );
  }

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.firebase.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }
  return {
    userUid,
    profile,
    requesting: state.firestore.status.requesting,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos
  }
};

export default compose(
  connect(mapState),
  firestoreConnect(({auth, userUid}) => queryUserDetail(auth, userUid))
)(UserDetailedPage);
