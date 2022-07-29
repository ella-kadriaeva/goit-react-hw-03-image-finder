import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    search: '',
  };
  formSubmit = search => {
    this.setState({ search });
    console.log(search);
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.formSubmit} />
        <ImageGallery search={this.state.search} />
        <ToastContainer position="top-right" autoClose={2000} rtl={false} />
      </div>
    );
  }
}
