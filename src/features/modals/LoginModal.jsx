import React from 'react';
import {Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {closeModal} from './modalActions';
import LoginForm from '../auth/Login/LoginForm';

const actions = {closeModal};

const LoginModal = ({closeModal}) =>  {
  return (
    <Modal
      size='mini'
      open={true}
      onClose={closeModal}
    >
      <Modal.Header>
        Login to Re-vents
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <LoginForm />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}


export default connect(null, actions)(LoginModal);
