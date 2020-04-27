import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-responsive-modal';
import { FaSpinner } from 'react-icons/fa';

import './style.css';

function LoadingModal({ open }) {
  return (
    <Modal
      open={open}
      center
      showCloseIcon={false}
      classNames={{
        modal: 'loading-modal',
      }}
      onClose={() => undefined}
    >
      <FaSpinner className="loading-svg" size={50} color="white" />
    </Modal>
  );
}

LoadingModal.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default LoadingModal;
