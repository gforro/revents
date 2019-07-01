import React from 'react';
import {Grid, GridColumn} from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import {connect} from 'react-redux';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';
import {firestoreConnect, isLoaded} from 'react-redux-firebase';

const EventDashboard = ({events}) => {

  if (!isLoaded(events)) {
    return <LoadingComponent inverted={true} />
  }
  else {
    return (
      <Grid>
        <GridColumn width="10">
          <EventList events={events}/>
        </GridColumn>
        <GridColumn width="6">
          <EventActivity/>
        </GridColumn>
      </Grid>
    );
  }
}

const mapState = state => ({
  events: state.firestore.ordered.events
});

export default connect(mapState)(firestoreConnect([{collection: 'events'}])(EventDashboard));
