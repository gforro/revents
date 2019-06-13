import React, {Component} from 'react';
import {connect} from 'react-redux';
import {decrementCounter, incrementCounter} from './testActions';
import {Button} from 'semantic-ui-react';
import TestPlaceInput from './TestPlaceInput';
import TestMap from './TestMap';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

class TestComponent extends Component {
  state = {
    address: null,
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
    const {data, incrementCounter, decrementCounter} = this.props;
    return (
      <div>
        <h1>Test Component</h1>
        <h4>{data}</h4>
        <Button onClick={incrementCounter} positive content="Increment" />
        <Button onClick={decrementCounter} negative content="Decrement" />
        <br />
        <br />
        <TestPlaceInput place={this.state.address} changePlace={this.handleChangePlace} selectPlace={this.handleSelectPlace}/>
        <TestMap latLng={this.state.latLng} zoom={this.state.zoom} key={'' + this.state.latLng.lat}/>
      </div>
    );
  }
}

const mapState = (state) => ({
  data: state.test.data
});

const actions = {
  incrementCounter,
  decrementCounter
};

export default connect(mapState, actions)(TestComponent);
