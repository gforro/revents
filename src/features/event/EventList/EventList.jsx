import React from 'react';
import EventListItem from './EventListItem';

const EventList = ({events, deleteEvent}) => {
  return (
    <div>
      {events && events.map(event => <EventListItem key={event.id} event={event} deleteEvent={deleteEvent}/>)}
    </div>
  );
}

export default EventList;
