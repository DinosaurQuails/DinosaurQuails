import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

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
  constructor(props) {
    super(props)
      this.state = {
      view: 'detail',
      appliedDate: '',
      state: '',
      payRange: '',
      open: true
    };
  }

  update(){
    let updatedData ={
      appliedDate: this.state.appliedDate,
      state: this.state.state,
      payRange: this.state.payRange
    }
    this.props.updatedData('/job', updatedData, (res) => {
     this.props.getJobData();
     this.props.detailClose();
    })
  }


  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // handleOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  render() {
    const { classes } = this.props;
    const { company, contact, appliedDate, postDate, interviewDate, state } = this.props.job
    if (this.state.view === 'detail') {
      return (
        <div>
          {/* <Typography gutterBottom>Click to get the full Modal experience!</Typography> */}
          {/* <Button onClick={this.handleOpen}>INFO</Button> */}
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <Typography variant="title" id="modal-title">
                {company.name}
              </Typography>
              <Typography variant="subheading" id="simple-modal-description">
                {company.jobTitle}
              </Typography>
              <Typography variant="caption" id="simple-modal-description">
                <p> Entry Date: {appliedDate}  </p>
                <p> Status: {state}  </p>
                <p> Salary: {company.payRange} </p>
              </Typography>
            <Button className={classes.pallete} onClick={() => this.props.detailClose()} align="inherit" variant="subheading">
                CLOSE
            </Button>
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
          {/* <Button onClick={this.handleOpen}>INFO</Button> */}
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <Typography variant="title" id="modal-title">
              {company.name}
          </Typography>
              <Typography variant="subheading" id="simple-modal-description">
              {company.jobTitle}
          </Typography>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  onChange={this.handleChange}
                  id="full-width"
                  name="appliedDate"
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder={appliedDate}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  onChange={this.handleChange}
                  id="full-width"
                  name="state"
                  label="Status"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder={state}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  onChange={this.handleChange}
                  id="full-width"
                  name="payRange"
                  label="Salary"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder={company.payRange}
                  fullWidth
                  margin="normal"
                />
              </form>
              <Button className={classes.pallete} onClick={() => this.setState({ view: 'detail' })} align="inherit" variant="subheading">
                BACK
             </Button>
             <Button className={classes.pallete} onClick={this.update} align="inherit" variant="subheading">
                UPDATE
             </Button>
             <Button className={classes.pallete} onClick={() => this.props.detailClose()} align="inherit" variant="subheading">
                CLOSE
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

// We need an intermediary variable for hand`ling the recursive nesting.
const JobDetailWrapped = withStyles(styles)(JobDetail);

export default JobDetailWrapped;