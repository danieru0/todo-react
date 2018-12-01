import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import './login.css';

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

class Login extends Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
      email: null,
      password: null
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    this.props.signIn({email: this.state.email, password: this.state.password});
  }

  render() {
    const { classes, auth } = this.props;
    if (auth.uid) return <Redirect to="/app" />
    return (
      <div className="login">
        <form onSubmit={this.handleLoginSubmit} className="login__form">
          <div className="form-group">
            <input onChange={this.handleInputChange} name="email" required type="text" className="login__email"></input>
            <label htmlFor="email" className="floating-label">Your email</label>
          </div>
          <div className="form-group">
            <input onChange={this.handleInputChange} name="password" required type="password" className="login__password"></input>
            <label htmlFor="password" className="floating-label">Your password</label>
          </div>
          <Button
            disabled={this.state.submitted}
            type="submit"
            variant="contained"
            className={classes.cssRoot}
          > { this.state.submitted ? <CircularProgress className={classes.loader} size={20} /> : 'Log in' } </Button>
          <Link to="/register">Don't have an account? Create one!</Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
