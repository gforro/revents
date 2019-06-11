import React from 'react';
import {Button, Form, Segment} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {createEvent, updateEvent} from '../eventActions';
import cuid from 'cuid';

const EventForm = ({event: providedEvent, createEvent, updateEvent, history}) => {
  const [event, setEvent] = React.useState(providedEvent);

  const handleInputChange = ({target: {name, value}}) => {
    setEvent(prevEvent => ({
      ...prevEvent,
      [name]: value
    }));
  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    if (event.id) {
      updateEvent(event);
      history.push(`/events/${event.id}`);
    } else {
      const newEvent = {
        ...event,
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      };
      createEvent(newEvent);
      history.push('/events');
    }
  }

  return (
    <Segment>
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <label>Event Title</label>
          <input name="title" value={event.title} onChange={handleInputChange} placeholder="Title" />
        </Form.Field>
        <Form.Field>
          <label>Event Date</label>
          <input name="date" value={event.date} onChange={handleInputChange} type="date" placeholder="Event Date" />
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <input name="city" value={event.city} onChange={handleInputChange} placeholder="City event is taking place" />
        </Form.Field>
        <Form.Field>
          <label>Venue</label>
          <input name="venue" value={event.venue} onChange={handleInputChange} placeholder="Enter the Venue of the event" />
        </Form.Field>
        <Form.Field>
          <label>Hosted By</label>
          <input name="hostedBy" value={event.hostedBy} onChange={handleInputChange} placeholder="Enter the name of person hosting" />
        </Form.Field>
        <Button positive type="submit">
          Submit
        </Button>
        <Button type="button" onClick={history.goBack}>Cancel</Button>
      </Form>
    </Segment>

  );
}


const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  };

  if (eventId && state.events.length > 0) {
    event = state.events.filter(e => e.id === eventId)[0];
  }
  return { event }
}

const actions = {
  createEvent,
  updateEvent
}

export default connect(mapState, actions)(EventForm);
