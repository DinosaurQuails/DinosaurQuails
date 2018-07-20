import React, { Component, Fragment } from 'react';
import Nav from './Nav.jsx';
import SelectBar from './SelectBar.jsx'
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      session: false,
      user: {
        firstName: '',
        lastName: '',
        userName: '',
        email: ''
      },
      jobs: []
    };
  }

  retrieveData(endpoint, params, callback) {
    axios.get(endpoint, params)
          .then(response => {
            // update respective data
            callback(response);
          })
          .catch(err => console.log(err));
  }

  submitData(endpoint, params, callback) {
    axios.post(endpoint, params)
          .then(response => {
            callback(response);
          })
          .catch(err => console.log(err));
  }

  updateData(endpoint, params, callback) {
    axios.put(endpoint, params, callback)
          .then(response => {
            callback(response);
          })
          .catch(err => console.log(err));
  }

  deleteData(endpoint, params, callback) {
    axios.put(endpoint, params, callback)
          .then(response => {
            callback(response);
          })
          .catch(err => console.log(err));
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
