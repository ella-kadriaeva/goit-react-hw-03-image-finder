import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    searchQuery: '',
  };
  render() {
    return (
      <ul className={css.imageGallery}>
        {images.map(({ id, tags, webformatURL }) => (
          <ImageGalleryItem
            key={id}
            tags={tags}
            webformatURL={webformatURL}
            // onImageClick={() => getLargeImage(id)}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.shape({
    id: PropTypes.string,
    webformatURL: PropTypes.string,
    // largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }),
  getLargeImage: PropTypes.func,
};
