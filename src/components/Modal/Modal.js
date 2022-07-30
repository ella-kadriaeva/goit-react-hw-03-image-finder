import css from './Modal.module.css';
import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ largeImageURL }) => {
  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <img src={largeImageURL} />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string,
};
