import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
class ImageGallery extends Component {
  render() {
    const { images, onClickGalleryItem } = this.props;
    return (
      <ul className={css.imageGallery}>
        {images.map(({ webformatURL, id, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            onClickGalleryItem={onClickGalleryItem}
            webformatURL={webformatURL}
            tags={tags}
            largeImageURL={largeImageURL}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  onClickGalleryItem: PropTypes.func,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
};

export default ImageGallery;
