import React, {Component} from 'react';
import {Button, Icon, Item, List, Segment} from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import {Link} from 'react-router-dom';
import {format, parseISO} from 'date-fns';

class EventListItem extends Component {
  render() {
    const {event, deleteEvent} = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header>{event.title}</Item.Header>
                <Item.Description>
                  Hosted by {event.hostedBy}
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(parseISO(event.date), 'EEEE, do LLLL')} |
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees && event.attendees.map(a => <EventListAttendee key={a.id} attendee={a}/>)}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button onClick={() => deleteEvent(event.id)} as="a" color="red" floated="right" content="Delete" />
          <Button as={Link} to={`/events/${event.id}`} color="teal" floated="right" content="View" />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
