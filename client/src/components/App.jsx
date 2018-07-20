import React, { Component, Fragment } from 'react';
import Nav from './Nav.jsx';
import SelectBar from './SelectBar.jsx'
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      default: false
    };
  }

  render() {
    return (
      <Fragment>
        <Nav />
        <SelectBar />
      </Fragment>
    );
  }
}

export default App;
