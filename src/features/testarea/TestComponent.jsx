import React, {Component} from 'react';
import {connect} from 'react-redux';
import {decrementCounter, incrementCounter} from './testActions';
import {Button} from 'semantic-ui-react';

class TestComponent extends Component {
  render() {
    const {data, incrementCounter, decrementCounter} = this.props;
    return (
      <div>
        <h1>Test Component</h1>
        <h4>{data}</h4>
        <Button onClick={incrementCounter} positive content="Increment" />
        <Button onClick={decrementCounter} negative content="Decrement" />
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
