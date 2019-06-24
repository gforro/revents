import React, {Component} from 'react';
import {connect} from 'react-redux';
import {decrementAsync, incrementAsync} from './testActions';
import {Button} from 'semantic-ui-react';
import TestPlaceInput from './TestPlaceInput';
import TestMap from './TestMap';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {openModal} from '../modals/modalActions';

class TestComponent extends Component {
  state = {
    address: '',
    latLng: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }

  handleChangePlace = address => {
    this.setState({ address });
  };

  handleSelectPlace = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({latLng}))
      .catch(error => console.error('Error', error));
  };

  render() {
    const {data, openModal, incrementAsync, decrementAsync, loading} = this.props;
    return (
      <div>
        <h1>Test Component</h1>
        <h4>{data}</h4>
        <Button loading={loading} onClick={incrementAsync} positive content="Increment" />
        <Button loading={loading} onClick={decrementAsync} negative content="Decrement" />
        <Button onClick={() => openModal('TestModal', {data: 43})} color="teal" content="Open Modal" />
        <br />
        <br />
        <TestPlaceInput place={this.state.address} changePlace={this.handleChangePlace} selectPlace={this.handleSelectPlace}/>
        <TestMap latLng={this.state.latLng} zoom={this.state.zoom} key={'' + this.state.latLng.lat}/>
      </div>
    );
  }
}

const mapState = (state) => ({
  data: state.test.data,
  loading: state.async.loading
});

const actions = {
  openModal,
  incrementAsync,
  decrementAsync
};

export default connect(mapState, actions)(TestComponent);
