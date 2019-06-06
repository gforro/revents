import React, {Component} from 'react';
import {Button, Container} from 'semantic-ui-react';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';

const App = () => {
  return (
    <>
      <NavBar/>
      <Container className="main">
      <EventDashboard/>
      </Container>
    </>
  );
}

export default App;
