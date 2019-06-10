import React from 'react';
import {Button, Grid, GridColumn} from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import cuid from 'cuid';

const _events = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
]


const EventDashboard = () => {
  const [events, setEvents] = React.useState(_events);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const handleFormCancel = () => setIsOpen(false);

  const handleCreateFormOpen = () => {
    setIsOpen(true);
    setSelectedEvent(null);
  }

  const handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    setEvents(prevEvents => [...prevEvents, newEvent]);
    setIsOpen(false);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  }

  return (
    <Grid>
      <GridColumn width="10">
        <EventList events={events} selectEvent={handleSelectEvent}/>
      </GridColumn>
      <GridColumn width="6">
        <Button positive content="Create Event" onClick={handleCreateFormOpen} />
        {isOpen && <EventForm selectedEvent={selectedEvent} cancelFormOpen={handleFormCancel} createEvent={handleCreateEvent}/>}
      </GridColumn>
    </Grid>
  );
}

export default EventDashboard;
