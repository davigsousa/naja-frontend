import React, { Component } from 'react';

import SideNav from './components/SideNav';

class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      products: [],
      actualCategory: '',
    };
  }

  render() {
    return (
      <SideNav />
    );
  }
}

export default Panel;
