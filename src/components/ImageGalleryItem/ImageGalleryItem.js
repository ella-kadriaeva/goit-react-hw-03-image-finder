import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ webformatURL, tags, onImgClick }) {
  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryImage}
        onClick={onImgClick}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.shape({
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
  }),
  onImgClick: PropTypes.func,
};
