import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
class ImageGalleryItem extends Component {
  render() {
    const { images, onClickGalleryItem } = this.props;
    return (
      <ul className={css.imageGallery}>
        {images.map(({ webformatURL, id, tags, largeImageURL }) => (
          <li className={css.imageGalleryItem} key={id}>
            <img
              className={css.imageGalleryImage}
              onClick={() => onClickGalleryItem(largeImageURL, tags)}
              src={webformatURL}
              alt={tags}
            />
          </li>
        ))}
      </ul>
    );
  }
}

ImageGalleryItem.propTypes = {
  onClickGalleryItem: PropTypes.func,
};

export default ImageGalleryItem;
