import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './ImageGallery/ImageGallery';
// import ImageGallery from './ImageGallery/ImageGallery';
// const BASE_URL = 'https://pixabay.com/api/';
// const axios = require('axios').default;

// const searchParams = new URLSearchParams({
//   key: '28892188-479e66a0f895169366b55aa9c',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
//   per_page: 12,
// });

export default class App extends Component {
  state = {
    searchQuery: '',
  };
  formSubmit = searchQuery => {
    this.setState({ searchQuery });
    console.log(searchQuery);
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.formSubmit} />
        <ImageGallery searchQuery={this.state.searchOuery} />
        <ToastContainer position="top-right" autoClose={2000} rtl={false} />
      </div>
    );
  }
}
