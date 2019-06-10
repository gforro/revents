import React from 'react';
import EventListItem from './EventListItem';

const EventList = ({events, selectEvent, deleteEvent}) => {
  return (
    <div>
      <h1>Event List</h1>
      {events.map(event => <EventListItem key={event.id} event={event} selectEvent={selectEvent} deleteEvent={deleteEvent}/>)}
    </div>
  );
}

export default EventList;
