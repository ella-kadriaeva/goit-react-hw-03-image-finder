import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './ImageGallery/ImageGallery';

import css from './App.module.css';
export default class App extends Component {
  state = {
    search: '',
  };

  formSubmit = search => {
    this.setState({ search });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.formSubmit} />
        <ImageGallery search={this.state.search} />
        <ToastContainer position="top-right" autoClose={2000} rtl={false} />
      </div>
    );
  }
}
