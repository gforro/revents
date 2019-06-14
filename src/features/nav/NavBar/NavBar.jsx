import React from 'react';
import {Button, Container, Menu} from 'semantic-ui-react';
import {Link, NavLink} from 'react-router-dom';
import SignedInMenu from '../Menus/SignedInMenu';
import SignedOutMenu from '../Menus/SignedOutMenu';
import {withRouter} from 'react-router-dom';
import {logout} from '../../auth/authActions';
import {connect} from 'react-redux';
import {openModal} from '../../modals/modalActions';

const NavBar = ({history, auth: {authenticated, currentUser}, logout, openModal}) => {
  const handleSignIn = () => openModal('LoginModal');

  const handleRegister = () => openModal('RegisterModal');

  const handleSignOut = () => {
    logout();
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
        {authenticated ? <SignedInMenu signOut={handleSignOut} currentUser={currentUser} /> : <SignedOutMenu signIn={handleSignIn} register={handleRegister} />}
      </Container>
    </Menu>
  );
}

const mapState = (state) => ({
  auth: state.auth
})

const actions = {
  logout,
  openModal
}


export default withRouter(connect(mapState, actions)(NavBar));
