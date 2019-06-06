import React, {Component} from 'react';
import EventListItem from './EventListItem';

const EventList = ({events}) => {
  return (
    <div>
      <h1>Event List</h1>
      <EventListItem />
      <EventListItem />
      <EventListItem />
      <EventListItem />
    </div>
  );
}

export default EventList;
