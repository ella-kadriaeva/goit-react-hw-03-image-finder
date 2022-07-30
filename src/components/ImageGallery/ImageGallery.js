import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import Loader from '../Loader/Loader';
import imagesApi from '../services/fetchApi';
import { toast } from 'react-toastify';

export default class ImageGallery extends Component {
  state = {
    search: null,
    page: 1,
    images: [],
    error: null,
    status: 'idle',
    visible: false,
  };

  componentDidUpdate(prevProps, _) {
    const currentSearch = this.props.search;
    const currentPage = this.props.page;
    if (prevProps.search !== currentSearch || prevProps.page !== currentPage) {
      this.setState({
        status: 'pending',
        page: currentPage,
      });
      imagesApi
        .fetchApi(currentSearch, currentPage)
        .then(data => data.hits)
        .then(images => {
          if (images.length === 0) {
            toast.info('There are no images for your request.', {
              position: 'top-center',
            });
          }
          this.setState({ images, status: 'resolved', visible: true });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
      return;
    }
  }

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
