/*global google*/
import React, {Component} from 'react';
import {Form, Button, Segment, Grid, GridColumn, Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {createEvent, updateEvent} from '../eventActions';
import cuid from 'cuid';
import {Field, reduxForm} from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import {combineValidators, composeValidators, hasLengthGreaterThan, isRequired} from 'revalidate';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

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

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {}
  }

  onHandleSubmit = (data) => {
    data.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      this.props.updateEvent(data);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
    } else {
      const newEvent = {
        ...data,
        id: cuid(),
        hostPhotoURL:'/assets/user.png'
      }
      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
  }

  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
      .then(result => getLatLng(result[0]))
      .then(latlng => this.setState({cityLatLng: latlng}))
      .then(() => this.props.change('city', selectedCity));
  }

  handleVenueSelect = (selectedVenue) => {
    geocodeByAddress(selectedVenue)
      .then(result => getLatLng(result[0]))
      .then(latlng => this.setState({venueLatLng: latlng}))
      .then(() => this.props.change('venue', selectedVenue));
  }

  render() {
    const {initialValues, history, submitting, invalid, pristine, handleSubmit} = this.props;
    return (
      <Grid centered>
        <GridColumn width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details"/>
            <Form onSubmit={handleSubmit(this.onHandleSubmit)}>
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
                onSelect={this.handleCitySelect}/>
              <Field
                name="venue"
                component={PlaceInput}
                placeholder="Event Venue"
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  type: 'establishment',
                  radius: 1000
                }}
                onSelect={this.handleVenueSelect}/>
              <Field name="date" component={DateInput} placeholder="Event Date" dateFormat="dd LLL yyyy h:mm a" showTimeSelect timeFormat="HH:mm" timeIntervals="15" />
              <Button disabled={submitting || invalid || pristine} positive type="submit">
                Submit
              </Button>
              <Button type="button" onClick={() => initialValues.id ? history.push(`/events/${initialValues.id}`) : history.push('/events') }>Cancel</Button>
            </Form>
          </Segment>
        </GridColumn>
      </Grid>
    );
  }
}

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(e => e.id === eventId)[0];
  }
  return { initialValues: event }
}

const actions = {
  createEvent,
  updateEvent
}

export default connect(mapState, actions)(reduxForm({form: 'eventForm', validate: validator})(EventForm));
