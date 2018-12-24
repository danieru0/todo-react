import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
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

  componentWillReceiveProps() {
    this.setState({ submitted: false });
  }

  handleRegisterSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    this.props.signUp({ email: this.state.email, password: this.state.password, name: this.state.name });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes, authRegisterError, auth } = this.props;
    if (auth.uid) return <Redirect to="/app" />
    return (
      <div className="register">
        <form onSubmit={this.handleRegisterSubmit} className="register__form">
          <div className="register__errors">
            <p>{authRegisterError}</p>
          </div>
          <div className="form-group">
            <input onChange={this.handleInputChange} name="name" type="text" className="register__name" required></input>
            <label htmlFor="name" className="floating-label">Full name</label>
          </div>
          <div className="form-group">
            <input onChange={this.handleInputChange} name="email" className="register__email" required type="text"></input>
            <label htmlFor="name" className="floating-label">Your email</label>
          </div>
          <div className="form-group">
            <input onChange={this.handleInputChange} name="password" className="register__password" required type="password"></input>
            <label htmlFor="password" className="floating-label">Your password</label>
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

const mapDispatchToProps = (dispatch) => {
  return {
      signUp: (newUser) => dispatch(signUp(newUser))
  }
}

const mapStateToProps = (state) => {
  return {
      auth: state.firebase.auth,
      authRegisterError: state.auth.authRegisterError
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register));
