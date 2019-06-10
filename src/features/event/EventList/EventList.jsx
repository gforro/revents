import React from 'react';
import EventListItem from './EventListItem';

const EventList = ({events, selectEvent}) => {
  return (
    <div>
      <h1>Event List</h1>
      {events.map(event => <EventListItem key={event.id} event={event} selectEvent={selectEvent}/>)}
    </div>
  );
}

export default EventList;
