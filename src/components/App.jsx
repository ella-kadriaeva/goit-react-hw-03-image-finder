import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import css from './App.module.css';
export default class App extends Component {
  state = {
    search: '',
    page: 1,
  };

  formSubmit = search => {
    this.setState({ search, page: 1 });
  };
  LoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.formSubmit} />
        <ImageGallery search={this.state.search} page={this.state.page} />
        <ToastContainer position="top-right" autoClose={2000} rtl={false} />
        <Button onLoadMoreClick={this.LoadMore} />
      </div>
    );
  }
}
