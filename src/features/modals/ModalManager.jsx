import React from 'react';
import TestModal from './TestModal';
import {connect} from 'react-redux';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const modalLookup = {
  TestModal,
  LoginModal,
  RegisterModal
}

const ModalManager = ({currentModal}) => {
  let modalToRender = null;

  if (currentModal) {
    const {modalType, modalProps} = currentModal;
    const TheModal = modalLookup[modalType];
    modalToRender = <TheModal {...modalProps} />
  }

  return <span>{modalToRender}</span>;
}

const mapState = (state) => ({
  currentModal: state.modals
})

export default connect(mapState)(ModalManager);
