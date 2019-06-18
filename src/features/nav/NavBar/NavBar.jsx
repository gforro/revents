import React from 'react';
import {Button, Container, Menu} from 'semantic-ui-react';
import {Link, NavLink} from 'react-router-dom';
import SignedInMenu from '../Menus/SignedInMenu';
import SignedOutMenu from '../Menus/SignedOutMenu';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {openModal} from '../../modals/modalActions';
import {withFirebase} from 'react-redux-firebase';

const NavBar = ({history, auth, profile, openModal, firebase}) => {
  const handleSignIn = () => openModal('LoginModal');

  const handleRegister = () => openModal('RegisterModal');

  const handleSignOut = () => {
    firebase.logout();
    history.push('/');
  }

  const authenticated = auth && auth.isLoaded && !auth.isEmpty;

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <img src="/assets/logo.png" alt="logo" />
          Re-vents
        </Menu.Item>
        <Menu.Item as={NavLink} to='/events' exact name="Events" />
        {authenticated &&
        <>
          <Menu.Item as={NavLink} to='/people' name="People"/>
          <Menu.Item as={NavLink} to='/test' name="Test"/>
          <Menu.Item as={Link} to='/createEvent'>
            <Button floated="right" positive inverted content="Create Event"/>
          </Menu.Item>
        </>
        }
        {authenticated ? <SignedInMenu signOut={handleSignOut} profile={profile} /> : <SignedOutMenu signIn={handleSignIn} register={handleRegister} />}
      </Container>
    </Menu>
  );
}

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.auth
})

const actions = {
  openModal
}


export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));
