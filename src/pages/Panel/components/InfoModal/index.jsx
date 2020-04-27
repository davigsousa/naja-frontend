import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-responsive-modal';

function InfoModal({
  title, message = '', open, onClose,
}) {
  return (
    <Modal
      open={open}
      center
      onClose={onClose}
    >
      <h1>{title}</h1>
      <p>{message}</p>
      <button type="button" onClick={onClose}>OK</button>
    </Modal>
  );
}

InfoModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

InfoModal.defaultProps = {
  message: '',
};

export default InfoModal;
