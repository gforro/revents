import React from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';

const LoadingComponent = ({inverted}) => {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content="Loading..." />
    </Dimmer>
  );
};

export default LoadingComponent;
