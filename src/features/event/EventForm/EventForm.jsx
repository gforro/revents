/*global google*/
import React, {Component} from 'react';
import {Button, Form, Grid, GridColumn, Header, Segment} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {cancelToggleEvent, createEvent, updateEvent} from '../eventActions';
import {Field, reduxForm} from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import {combineValidators, composeValidators, hasLengthGreaterThan, isRequired} from 'revalidate';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {toastr} from 'react-redux-toastr';
import {compose} from 'redux';
import {withFirestore} from 'react-redux-firebase';

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

  componentDidMount() {
    const {firestore, match} = this.props;
    firestore.setListener(`events/${match.params.id}`);
  }

  componentWillUnmount() {
    const {firestore, match} = this.props;
    firestore.unsetListener(`events/${match.params.id}`);
  }

  onHandleSubmit = async (data) => {
    try {
      data.venueLatLng = this.state.venueLatLng;
      if (this.props.initialValues.id) {
        if (Object.keys(data.venueLatLng).length === 0) {
          data.venueLatLng = this.props.event.venueLatLng;
        }
        this.props.updateEvent(data);
        this.props.history.push(`/events/${this.props.initialValues.id}`);
      } else {
        const newEvent = this.props.createEvent(data);
        this.props.history.push(`/events/${newEvent.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleCancelToggle = (cancelled, eventId) => {
    const confirmMessage = cancelled ? 'Are You sure to cancel the event?' : 'Event is cancelled. Are You sure to reactivate it?';
    toastr.confirm(confirmMessage, {
      onOk: () => this.props.cancelToggleEvent(cancelled, eventId)
    })
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
    const {initialValues, history, submitting, invalid, pristine, handleSubmit, event} = this.props;
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
              <Button onClick={() => this.handleCancelToggle(!event.cancelled, event.id)} type="button" color={event.cancelled ? 'green' : 'red'} content={event.cancelled ? 'Reactivate Event' : 'Cancel Event'} floated="right"/>
            </Form>
          </Segment>
        </GridColumn>
      </Grid>
    );
  }
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
