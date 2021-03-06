import React, {Component} from 'react';
import {Button, Container, Menu} from 'semantic-ui-react';
import {Link, NavLink} from 'react-router-dom';
import SignedInMenu from '../Menus/SignedInMenu';
import SignedOutMenu from '../Menus/SignedOutMenu';
import {withRouter} from 'react-router-dom';
import {openModal} from '../../modals/modalActions';
import {connect} from 'react-redux';
import {withFirebase} from 'react-redux-firebase';

class NavBar extends Component {
  handleSignIn = () => this.props.openModal('LoginModal');

  handleRegister = () => this.props.openModal('RegisterModal');

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  }

  render() {
    const {auth, profile} = this.props;
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
          {authenticated ? <SignedInMenu signOut={this.handleSignOut} profile={profile} auth={auth}/> : <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister}/> }
        </Container>
      </Menu>
    );
  }
}

const actions = {
  openModal
};

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
})

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));
