import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-responsive-modal';

function InfoModal({ title, message = '', open }) {
  const [openModal, setOpenModal] = useState(false);
  setOpenModal(open);

  return (
    <Modal
      open={openModal}
      center
      onClose={() => setOpenModal(false)}
    >
      <h1>{title}</h1>
      <p>{message}</p>
      <button type="button" onClick={() => setOpenModal(false)}>OK</button>
    </Modal>
  );
}

InfoModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  open: PropTypes.bool.isRequired,
};

InfoModal.defaultProps = {
  message: '',
};

export default InfoModal;
