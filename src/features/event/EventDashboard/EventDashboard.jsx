import React, {Component} from 'react';
import {Grid, GridColumn} from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import {connect} from 'react-redux';
import {deleteEvent} from '../eventActions';

class EventDashboard extends Component {

  handleDeleteEvent = (eventId) => {
    this.props.deleteEvent(eventId);
}

  render() {
    const {events} = this.props;
    return (
      <Grid>
        <GridColumn width="10">
          <EventList events={events} deleteEvent={this.handleDeleteEvent}/>
        </GridColumn>
        <GridColumn width="6">
          <h1>Activity Feed</h1>
        </GridColumn>
      </Grid>
    );
  }
}

const mapState = state => ({
  events: state.events
});

const actions = {
  deleteEvent
};

export default connect(mapState, actions)(EventDashboard);
