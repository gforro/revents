/*global google*/
import React from 'react';
import {Button, Form, Grid, GridColumn, Header, Segment} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {cancelToggleEvent, createEvent, updateEvent} from '../eventActions';
import {Field, reduxForm} from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import DateInput from '../../../app/common/form/DateInput';
import {combineValidators, composeValidators, hasLengthGreaterThan, isRequired} from 'revalidate';
import SelectInput from '../../../app/common/form/SelectInput';
import TextArea from '../../../app/common/form/TextArea';
import PlaceInput from '../../../app/common/form/PlaceInput';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {withFirestore} from 'react-redux-firebase';
import {compose} from 'redux';
import {toastr} from 'react-redux-toastr';

const category = [
  {key: 'drinks', text: 'Drinks', value: 'drinks'},
  {key: 'culture', text: 'Culture', value: 'culture'},
  {key: 'film', text: 'Film', value: 'film'},
  {key: 'food', text: 'Food', value: 'food'},
  {key: 'music', text: 'Music', value: 'music'},
  {key: 'travel', text: 'Travel', value: 'travel'},
];

const validator = combineValidators({
  title: isRequired({message: 'The title of the event is required'}),
  category: isRequired('category'),
  description: composeValidators(
    isRequired({message: 'The description of the event is required'}),
    hasLengthGreaterThan(4)({message: 'The description should have 4 characters at least'})
  )(),
  venue: isRequired('venue'),
  city: isRequired('city'),
  date: isRequired('date')
});

const EventForm = ({initialValues, event, createEvent, updateEvent, history, handleSubmit, submitting, invalid, pristine, change, firestore, match, cancelToggleEvent}) => {
  const [cityLatLng, setCityLatLng] = React.useState({});
  const [venueLatLng, setVenueLatLng] = React.useState({});

  const handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
      .then(result => getLatLng(result[0]))
      .then(latlng => setCityLatLng(latlng))
      .then(() => change('city', selectedCity));
  }

  const handleVenueSelect = (selectedVenue) => {
    geocodeByAddress(selectedVenue)
      .then(result => getLatLng(result[0]))
      .then(latlng => setVenueLatLng(latlng))
      .then(() => change('venue', selectedVenue));
  }

  const onHandleSubmit = async (data) => {
    try {
      data.venueLatLng = venueLatLng;
      if (initialValues.id) {
        if (Object.keys(data.venueLatLng).length === 0) {
          data.venueLatLng = event.venueLatLng;
        }
        updateEvent(data);
        history.push(`/events/${initialValues.id}`);
      } else {
        const newEvent = createEvent(data);
        history.push(`/events/${newEvent.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCancelToggle = (cancelled, eventId) => {
    const confirmMessage = cancelled ? 'Are You sure to cancel the event?' : 'Event is cancelled. Are You sure to reactivate it?';
    toastr.confirm(confirmMessage, {
      onOk: () => {
        cancelToggleEvent(cancelled, eventId)
      }
    })
  }

  React.useEffect(() => {
    firestore.setListener(`events/${match.params.id}`);
    return () => {
      firestore.unsetListener(`events/${match.params.id}`);
    }
  }, [firestore, match]);

  return (
    <Grid centered>
      <GridColumn width={10}>
        <Segment>
          <Header sub color="teal" content="Event Details"/>
          <Form onSubmit={handleSubmit(onHandleSubmit)}>
            <Field name="title" component={TextInput} placeholder="Event Title" />
            <Field name="category" component={SelectInput} placeholder="What is your event about?" options={category}/>
            <Field name="description" component={TextArea} placeholder="Tell us about your event" rows="3" />
            <Header sub color="teal" content="Event Location Details" />
            <Field
              name="city"
              component={PlaceInput}
              placeholder="Event City"
              options={{
                types: ['(cities)']
              }}
              onSelect={handleCitySelect}/>
            <Field
              name="venue"
              component={PlaceInput}
              placeholder="Event Venue"
              options={{
                location: new google.maps.LatLng(cityLatLng),
                type: 'establishment',
                radius: 1000
              }}
              onSelect={handleVenueSelect}/>
            <Field name="date" component={DateInput} placeholder="Event Date"
                   dateFormat="dd LLL yyyy h:mm a"
                   showTimeSelect
                   timeFormat="HH:mm"
                   timeIntervals="15"
                   shouldCloseOnSelect
            />
            <Button disabled={submitting || invalid || pristine} positive type="submit">
              Submit
            </Button>
            <Button type="button" onClick={() => initialValues.id ? history.push(`/events/${initialValues.id}`) : history.push('/events') }>Cancel</Button>
            <Button onClick={() => handleCancelToggle(!event.cancelled, event.id)} type="button" color={event.cancelled ? 'green' : 'red'} content={event.cancelled ? 'Reactivate Event' : 'Cancel Event'} floated="right"/>
          </Form>
        </Segment>
      </GridColumn>
    </Grid>
  );
}


const mapState = (state, {match}) => {
  const eventId = match.params.id;
  let event = {};

  if (eventId && state.firestore.ordered.events) {
    event = state.firestore.ordered.events.filter(e => e.id === match.params.id)[0] || {};
  }
  return {
    initialValues: event,
    event
  }
}

const actions = {
  createEvent,
  updateEvent,
  cancelToggleEvent
}

export default compose(
  withFirestore,
  connect(mapState, actions),
  reduxForm({form: 'eventForm', validate: validator, enableReinitialize: true})
)(EventForm);
