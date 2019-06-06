import React, {Component} from 'react';
import {Button, Grid, GridColumn} from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

const EventDashboard = () => {
  return (
    <Grid>
      <GridColumn width="10">
        <EventList />
      </GridColumn>
      <GridColumn width="6">
        <Button positive content="Create Event" />
        <EventForm/>
      </GridColumn>
    </Grid>
  );
}

export default EventDashboard;
