import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import Loader from '../Loader/Loader';
import imagesApi from '../services/fetchApi';
import { toast } from 'react-toastify';
import Button from '../Button/Button';
// import Modal from '../Modal/Modal';
export default class ImageGallery extends Component {
  state = {
    page: 1,
    images: [],
    error: null,
    status: 'idle',
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.search !== this.props.search) {
      this.setState(
        () => {
          return {
            page: 1,
            images: [],
            status: 'pending',
          };
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

  render() {
    const { images, error, status } = this.state;
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
      <h1>{error.message}</h1>;
    }
    if (status === 'resolved') {
      return (
        <>
          {images.length > 0 && (
            <ImageGallery
              images={images}
              handleLargeURLImage={this.handleLargeURLImage}
            />
          )}
          <ul className={css.imageGallery}>
            {images.map(({ webformatURL, id, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                tags={tags}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                onImgClick={this.modalOpen}
              />
            ))}
          </ul>
          <Button onLoadMoreClick={this.loadMore} />
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  images: PropTypes.shape({
    id: PropTypes.string,
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
  }),
  getLargeImage: PropTypes.func,
};
