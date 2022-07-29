import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
const BASE_URL = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
  key: '28892188-479e66a0f895169366b55aa9c',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
});
export default class ImageGallery extends Component {
  state = {
    search: null,
    page: 1,
    images: null,
    loading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.search !== this.props.search) {
      const url = `${BASE_URL}?q=${this.props.search}&${searchParams}&page=${this.state.page}`;
      this.setState({ loading: true });
      fetch(url)
        .then(response => response.json())
        .then(data => data.hits)
        .then(images => this.setState({ images }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  render() {
    const { loading, images } = this.state;
    return (
      <ul className={css.imageGallery}>
        {loading && <div>Loading...</div>}
        {this.props.search === '' && (
          <div>
            What are we looking for? Please, enter a keyword in the search bar.
          </div>
        )}
        {images &&
          images.map(({ webformatURL, id, tags }) => (
            <ImageGalleryItem
              key={id}
              tags={tags}
              webformatURL={webformatURL}
              //   deleteContacts={() => deleteContacts(id)}
            />
          ))}
      </ul>
    );
  }
}

// largeImageURL: PropTypes.string,

ImageGallery.propTypes = {
  images: PropTypes.shape({
    id: PropTypes.string,
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
  }),
  getLargeImage: PropTypes.func,
};
