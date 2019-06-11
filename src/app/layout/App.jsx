import React from 'react';
import {Container} from 'semantic-ui-react';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import {Route, Switch} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/event/EventForm/EventForm';
import TestComponent from '../../features/testarea/TestComponent';
import {withRouter} from 'react-router-dom';

const App = ({location}) => {
  return (
    <>
      <Route exact path='/' component={HomePage}/>
      <Route path='/(.+)' render={() => (
        <>
          <NavBar/>
          <Container className="main">
            <Switch key={location.key}>
              <Route path='/events/:id' component={EventDetailedPage} />
              <Route path='/events' component={EventDashboard} />
              <Route path='/people' component={PeopleDashboard} />
              <Route path='/profile/:id' component={UserDetailedPage} />
              <Route path='/settings' component={SettingsDashboard} />
              <Route path={['/createEvent', '/manage/:id']} component={EventForm} />
              <Route path='/test' component={TestComponent} />
            </Switch>
          </Container>
        </>
      )} />
    </>
  );
}

export default withRouter(App);
