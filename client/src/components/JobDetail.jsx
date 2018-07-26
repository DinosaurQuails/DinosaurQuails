import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import JobMin from 'JobMin.jsx';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    height: theme.spacing.unit * 55,
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  palette: {
    color: '#7dce94',
    backgroundColor: '#CE7D86'
  },
});

class JobDetail extends React.Component {
  state = {
    open: false,
    view: 'detail',
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    if (this.state.view === 'detail') {
      return (
        <div>
          {/* <Typography gutterBottom>Click to get the full Modal experience!</Typography> */}
          <Button onClick={this.handleOpen}>INFO</Button>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <Typography variant="title" id="modal-title">
                Available Position
              </Typography>
              <Typography variant="subheading" id="simple-modal-description">
                Description of job in detail modal.
              </Typography>
              <Typography variant="caption" id="simple-modal-description">
                <p> Entry Date:  </p>
                <p> Status:  </p>
                <p> Salary: </p>
              </Typography>
              <Button className={classes.pallete} onClick={() => this.setState({ view: 'edit' })} align="inherit" variant="subheading">
                EDIT
            </Button>
            </div>
          </Modal>
        </div>
      );
    }
    else if (this.state.view === 'edit') {
      return (
        <div>
          {/* <Typography gutterBottom>Click to get the full Modal experience!</Typography> */}
          <Button onClick={this.handleOpen}>INFO</Button>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <Typography variant="title" id="modal-title">
                Available Position
          </Typography>
              <Typography variant="subheading" id="simple-modal-description">
                Description of job in detail modal.
          </Typography>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="full-width"
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Original Date"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="full-width"
                  label="Status"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Applied"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="full-width"
                  label="Salary"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="$1,000,000,000"
                  fullWidth
                  margin="normal"
                />
              </form>
              <Button className={classes.pallete} onClick={() => this.setState({ view: 'detail' })} align="inherit" variant="subheading">
                CANCEL
        </Button>
            </div>
          </Modal>
        </div>
      )
    }
  }
}

JobDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const JobDetailWrapped = withStyles(styles)(JobDetail);

export default JobDetailWrapped;