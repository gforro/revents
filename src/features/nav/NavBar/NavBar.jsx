import React, {Component} from 'react';
import {Button, Container, Menu} from 'semantic-ui-react';
import {Link, NavLink} from 'react-router-dom';
import SignedInMenu from '../Menus/SignedInMenu';
import SignedOutMenu from '../Menus/SignedOutMenu';
import {withRouter} from 'react-router-dom';
import {openModal} from '../../modals/modalActions';
import {connect} from 'react-redux';
import {logout} from '../../auth/authActions';

class NavBar extends Component {
  handleSignIn = () => this.props.openModal('LoginModal');

  handleRegister = () => this.props.openModal('RegisterModal');

  handleSignOut = () => {
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    const {authenticated, currentUser} = this.props.auth;
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
          {authenticated ? <SignedInMenu signOut={this.handleSignOut} currentUser={currentUser} /> : <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister}/> }
        </Container>
      </Menu>
    );
  }
}

const actions = {
  openModal,
  logout
};

const mapState = (state) => ({
  auth: state.auth
})

export default withRouter(connect(mapState, actions)(NavBar));
