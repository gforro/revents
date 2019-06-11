import React from 'react';
import {Grid, GridColumn} from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import {connect} from 'react-redux';

const EventDetailedPage = ({event}) => {
  return (
    <Grid>
      <GridColumn width="10">
        <EventDetailedHeader event={event}/>
        <EventDetailedInfo event={event}/>
        <EventDetailedChat/>
      </GridColumn>
      <GridColumn width="6">
        <EventDetailedSidebar attendees={event.attendees}/>
      </GridColumn>
    </Grid>
  );
};

const mapState = (state, {match}) => {
  let event = {};
  if (state.events) {
    event = state.events.filter(e => e.id === match.params.id)[0];
  }
  return { event };
}

export default connect(mapState)(EventDetailedPage);
