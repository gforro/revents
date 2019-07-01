import React, {Component} from 'react';
import {Image, ListItem} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class EventListAttendee extends Component {
  render() {
    const {attendee} = this.props;
    return (
      <ListItem>
        <Image as={Link} to={`/profile/${attendee.id}`} size="mini" circular src={attendee.photoURL}/>
      </ListItem>
    );
  }
}

export default EventListAttendee;
