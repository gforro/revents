import React, {Component} from 'react';
import {Grid, GridColumn} from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import {connect} from 'react-redux';
import {deleteEvent} from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';
import {firestoreConnect} from 'react-redux-firebase';

class EventDashboard extends Component {

  handleDeleteEvent = (eventId) => {
    this.props.deleteEvent(eventId);
  }

  render() {
    const {events, loading} = this.props;
    if (loading) return <LoadingComponent inverted={true} />
    return (
      <Grid>
        <GridColumn width="10">
          <EventList events={events} deleteEvent={this.handleDeleteEvent}/>
        </GridColumn>
        <GridColumn width="6">
          <EventActivity />
        </GridColumn>
      </Grid>
    );
  }
}

const mapState = state => ({
  events: state.firestore.ordered.events,
  loading: state.async.loading
});

const actions = {
  deleteEvent
};

export default connect(mapState, actions)(firestoreConnect([{collection: 'events'}])(EventDashboard));
