import React, {Component} from 'react';
import {Image, ListItem} from 'semantic-ui-react';

const EventListAttendee = () => {
  return (
    <ListItem>
      <Image as="a" size="mini" circular src="https://randomuser.me/api/portraits/women/42.jpg"/>
    </ListItem>
  );
}

export default EventListAttendee;
