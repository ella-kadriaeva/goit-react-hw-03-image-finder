import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGallery from '../ImageGallery/ImageGallery';
import css from './GalleryApp.module.css';
import Loader from '../Loader/Loader';
import imagesApi from '../services/fetchApi';
import { toast } from 'react-toastify';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
export default class GalleryApp extends Component {
  state = {
    page: 1,
    images: [],
    error: null,
    status: 'idle',
    imageOnModal: '',
    text: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
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
    const { searchQuery } = this.props;
    imagesApi
      .fetchApi(searchQuery, page)
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
          page: prevState.page + 1,
          status: 'resolved',
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
    this.setState(({ imageOnModal }) => ({
      imageOnModal: !imageOnModal,
    }));
  };
  render() {
    const { images, error, status } = this.state;
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
            <ImageGallery
              images={images}
              onClickGalleryItem={this.onClickGalleryItem}
            />
          )}
          <Button onLoadMoreClick={this.loadMore} />
          {imageOnModal && (
            <Modal onClick={this.onClickGalleryItem}>
              <img src={imageOnModal} alt={text} />
            </Modal>
          )}
        </>
      );
    }
  }
}

GalleryApp.propTypes = {
  images: PropTypes.shape({
    id: PropTypes.string.isRequired,
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
    largeImageURL: PropTypes.string,
  }),
  onClickGalleryItem: PropTypes.func,
  error: PropTypes.string,
  status: PropTypes.string,
  imageOnModal: PropTypes.string,
  text: PropTypes.string,
};
