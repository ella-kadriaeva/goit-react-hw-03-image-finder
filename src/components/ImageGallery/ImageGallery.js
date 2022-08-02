import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import Modal from '../Modal/Modal';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
export default class ImageGallery extends Component {
  state = {
    imageOnModal: '',
    text: '',
  };

  onClickGalleryItem = (src, alt) => {
    this.toggleModal();
    this.setState({ imageOnModal: src, text: alt });
  };
  toggleModal = () => {
    this.setState(({ imageOnModal }) => ({
      imageOnModal: !imageOnModal,
    }));
  };
  render() {
    const { images } = this.props;
    const { imageOnModal, text } = this.state;
    return (
      <>
        <ul className={css.imageGallery}>
          {images.map(({ webformatURL, id, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              onClickGalleryItem={this.onClickGalleryItem}
              webformatURL={webformatURL}
              tags={tags}
              largeImageURL={largeImageURL}
            />
          ))}
        </ul>
        {imageOnModal && (
          <Modal onClick={this.onClickGalleryItem}>
            <img src={imageOnModal} alt={text} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  id: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClickGalleryItem: PropTypes.func,
  imageOnModal: PropTypes.string,
  text: PropTypes.string,
};
