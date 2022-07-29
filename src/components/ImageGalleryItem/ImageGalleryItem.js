import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ webformatURL, tags }) {
  return (
    <li className={css.imageGalleryItem}>
      <img className={css.imageGalleryImage} src={webformatURL} alt={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.shape({
    id: PropTypes.string,
    webformatURL: PropTypes.string,
    // largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }),
};
