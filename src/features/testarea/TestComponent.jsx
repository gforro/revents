import React from 'react';
import {decrementCounter, incrementCounter} from './testActions';
import {connect} from 'react-redux';
import {Button} from 'semantic-ui-react';

const TestComponent = ({data, incrementCounter, decrementCounter}) => {
  return (
    <div>
      <h1>Test Component</h1>
      <h4>{data}</h4>
      <Button onClick={incrementCounter} positive content="Increment" />
      <Button onClick={decrementCounter} negative content="Decrement" />
    </div>
  );
};

const mapState = (state) => ({
  data: state.test.data
});

const actions = {
  incrementCounter,
  decrementCounter
};

export default connect(mapState, actions)(TestComponent);
