import React from 'react';
import {Image, ListItem} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const EventListAttendee = ({attendee}) => {
  return (
    <ListItem>
      <Image as={Link} to={`/profile/${attendee.id}`} size="mini" circular src={attendee.photoURL}/>
    </ListItem>
  );
}

export default EventListAttendee;
