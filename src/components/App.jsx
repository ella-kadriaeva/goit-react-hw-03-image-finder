import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  state = {};

  handleSubmit = e => {
    console.log(e);
  };
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
      </div>
    );
  }
}
