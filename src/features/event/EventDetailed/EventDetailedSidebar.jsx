import React from 'react';
import {Item, Label, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const EventDetailedSidebar = ({attendees}) => {
  //const isHost = false;
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: 'none' }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees && attendees.length} {attendees && attendees.length > 1 ? 'People' : 'Person'} Going
      </Segment>
      <Segment attached>
        <Item.Group>
          {attendees && attendees.map(attendee =>

              <Item as={Link} to={`/profile/${attendee.id}`} key={attendee.id} style={{ position: 'relative' }}>
                <Label
                  style={{ position: 'absolute' }}
                  color="orange"
                  ribbon="right"
                >
                  Host
                </Label>
                <Item.Image size="tiny" src={attendee.photoURL} />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    {attendee.displayName}
                  </Item.Header>
                </Item.Content>
              </Item>

          )}
        </Item.Group>
      </Segment>
    </>

  );
};

export default EventDetailedSidebar;
