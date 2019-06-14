import React, {Component} from 'react';
import {Grid, GridColumn} from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import {connect} from 'react-redux';
import {deleteEvent} from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

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
          <h1>Activity Feed</h1>
        </GridColumn>
      </Grid>
    );
  }
}

const mapState = state => ({
  events: state.events,
  loading: state.async.loading
});

const actions = {
  deleteEvent
};

export default connect(mapState, actions)(EventDashboard);
