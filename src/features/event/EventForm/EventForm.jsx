import React from 'react';
import {Button, Form, Segment} from 'semantic-ui-react';

const EventForm = ({cancelFormOpen, createEvent}) => {
  const [event, setEvent] = React.useState({
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  });

  const handleInputChange = ({target: {name, value}}) => {
    setEvent(prevEvent => ({
      ...prevEvent,
      [name]: value
    }));
  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    createEvent(event);
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
        <Button type="button" onClick={cancelFormOpen}>Cancel</Button>
      </Form>
    </Segment>

  );
}

export default EventForm;
