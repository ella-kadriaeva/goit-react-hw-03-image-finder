import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import Loader from '../Loader/Loader';
import imagesApi from '../services/fetchApi';
import { toast } from 'react-toastify';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
export default class ImageGallery extends Component {
  state = {
    page: 1,
    images: [],
    error: null,
    status: 'idle',
    showModal: false,
    imageOnModal: '',
    text: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.search !== this.props.search) {
      this.setState(
        () => {
          return { page: 1, images: [], status: 'pending' };
        },
        () => {
          this.fetchGallery();
        }
      );
    }
  }

  fetchGallery = () => {
    const { page } = this.state;
    const { search } = this.props;
    imagesApi
      .fetchApi(search, page)
      .then(data => data.hits)
      .then(images => {
        if (images.length === 0) {
          toast.info('There are no images for your request.', {
            position: 'top-center',
          });
          this.setState({ status: 'rejected' });
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'resolved',
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };
  loadMore = () => {
    this.fetchGallery();
    this.scrollPage();
  };
  scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };
  onClickGalleryItem = (src, alt) => {
    this.toggleModal();
    this.setState({ imageOnModal: src, text: alt });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { images, error, status, showModal } = this.state;
    const { imageOnModal, text } = this.state;

    if (status === 'idle') {
      return (
        <div className={css.text}>
          What are we looking for? Please, enter a keyword in the search bar.
        </div>
      );
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return error && <h1>{error.message}</h1>;
    }
    if (status === 'resolved') {
      return (
        <>
          {images.length > 0 && (
            <ImageGalleryItem
              images={images}
              onClickGalleryItem={this.onClickGalleryItem}
            />
          )}
          <Button onLoadMoreClick={this.loadMore} />
          {showModal && (
            <Modal onClick={this.onClickGalleryItem}>
              <img src={imageOnModal} alt={text} />
            </Modal>
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  images: PropTypes.shape({
    id: PropTypes.string.isRequired,
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
    largeImageURL: PropTypes.string,
  }),
  onClickGalleryItem: PropTypes.func,
};
