import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import GalleryApp from '../GalleryApp/GalleryApp';

import css from './App.module.css';
export default class App extends Component {
  state = {
    searchQuery: '',
  };

  formSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.formSubmit} />
        <GalleryApp searchQuery={this.state.searchQuery} />
        <ToastContainer position="top-right" autoClose={2000} rtl={false} />
      </div>
    );
  }
}
