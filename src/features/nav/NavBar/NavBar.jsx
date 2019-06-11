import React from 'react';
import {Button, Container, Menu} from 'semantic-ui-react';
import {Link, NavLink} from 'react-router-dom';
import SignedInMenu from '../Menus/SignedInMenu';
import SignedOutMenu from '../Menus/SignedOutMenu';
import {withRouter} from 'react-router-dom';

const NavBar = ({history}) => {
  const [authenticated, setAuthenticated] = React.useState(false);

  const handleSignIn = () => setAuthenticated(true);

  const handleSignOut = () => {
    setAuthenticated(false);
    history.push('/');
  }

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <img src="/assets/logo.png" alt="logo" />
          Re-vents
        </Menu.Item>
        <Menu.Item as={NavLink} to='/events' exact name="Events" />
        <Menu.Item as={NavLink} to='/people' name="People" />
        <Menu.Item as={NavLink} to='/test' name="Test" />
        <Menu.Item as={Link} to='/createEvent'>
          <Button floated="right" positive inverted content="Create Event" />
        </Menu.Item>
        {authenticated ? <SignedInMenu signOut={handleSignOut} /> : <SignedOutMenu signIn={handleSignIn} />}
      </Container>
    </Menu>
  );
}


export default withRouter(NavBar);
