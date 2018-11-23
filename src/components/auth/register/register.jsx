import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import './register.css';

const styles = {
  cssRoot: {
    backgroundColor: '#4a148c',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#7E57C2'
    }
  },
  loader: {
    color: '#4a148c'
  }
}

class Register extends Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
      name: null,
      email: null,
      password: null
    }
  }

  handleRegisterSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="register">
        <form onSubmit={this.handleRegisterSubmit} className="register__form">
          <div className="form-group">
            <input onChange={this.handleInputChange} name="name" type="text" className="register__name" required></input>
            <label for="name" className="floating-label">Full name</label>
          </div>
          <div className="form-group">
            <input onChange={this.handleInputChange} name="email" className="register__email" required type="text"></input>
            <label for="name" className="floating-label">Your email</label>
          </div>
          <div className="form-group">
            <input onChange={this.handleInputChange} name="password" className="register__password" required type="password"></input>
            <label for="password" className="floating-label">Your password</label>
          </div>
          <Button
            type="submit"
            variant="contained"
            className={classes.cssRoot}
            disabled={this.state.submitted}
          > { this.state.submitted ? <CircularProgress className={classes.loader} size={20} /> : 'Register' } </Button>
          <Link to="/">Have an account? Log in</Link>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Register);
