import React from 'react';
import EventListItem from './EventListItem';

const EventList = ({events}) => {
  return (
    <div>
      {events && events.map(event => <EventListItem key={event.id} event={event} />)}
    </div>
  );
}

export default EventList;
