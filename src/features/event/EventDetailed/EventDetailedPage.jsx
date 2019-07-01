import React from 'react';
import {Grid, GridColumn} from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import {connect} from 'react-redux';
import {withFirestore} from 'react-redux-firebase';
import {objectToArray} from '../../../app/common/util/helpers';
import {cancelGoingToEvent, goingToEvent} from '../../user/userActions';

const EventDetailedPage = ({auth, event, match, firestore, goingToEvent, cancelGoingToEvent}) => {
  React.useEffect(() => {
    firestore.setListener(`events/${match.params.id}`);
    return () => {
      firestore.unsetListener(`events/${match.params.id}`);
    }
  }, [firestore, match]);

  const attendees = objectToArray(event.attendees) || [];
  const isHost = event.hostUid === auth.uid;
  const isGoing = attendees.some(a => a.id === auth.uid);

  return (
    <Grid>
      <GridColumn width="10">
        <EventDetailedHeader event={event} isGoing={isGoing} isHost={isHost} goingToEvent={goingToEvent} cancelGoingToEvent={cancelGoingToEvent}/>
        <EventDetailedInfo event={event}/>
        <EventDetailedChat/>
      </GridColumn>
      <GridColumn width="6">
        <EventDetailedSidebar attendees={attendees}/>
      </GridColumn>
    </Grid>
  );
};

const mapState = (state, {match}) => {
  let event = {};
  if (state.firestore.ordered.events) {
    event = state.firestore.ordered.events.filter(e => e.id === match.params.id)[0] || {};
  }
  return {
    event,
    auth: state.firebase.auth
  };
}

const actions = {
  goingToEvent,
  cancelGoingToEvent
}

export default withFirestore(connect(mapState, actions)(EventDetailedPage));
