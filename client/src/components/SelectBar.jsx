import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Tabs, Tab } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1,
  },
};


class SelectBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event, value) {
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper style={styles.root}>
        <Tabs value={this.state.value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" centered >
          <Tab label="All" />
          <Tab label="Pending" />
          <Tab label="Offered" />
          <Tab label="Rejected" />
        </Tabs>
      </Paper>
    );
  }
}

export default SelectBar;