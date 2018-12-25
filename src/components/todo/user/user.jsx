import React, { Component } from 'react';
import { updateImages, changePassword, deleteAccount } from '../../../store/actions/userActions';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '../../menu/dialog/dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import './user.css';
import Redirect from 'react-router-dom/Redirect';

const styles = {
  save: {
    backgroundColor: '#4a148c',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#7E57C2'
    }
  },
  delete: {
    backgroundColor: '#e00032',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#f36c60'
    }
  },
  loader: {
    color: '#4a148c'
  }
}

class User extends Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
      deleteDialog: false,
      avatarImage: null,
      avatarImageLink: null,
      backgroundImage: null,
      backgroundImageLink: null,
      oldPassword: null,
      newPassword: null
    }
  }

  componentWillReceiveProps() {
    this.setState({ submitted: false });
  }

  handleUserSubmit = e => {
    e.preventDefault();
    if (this.state.avatarImage || this.state.backgroundImage || this.state.oldPassword || this.state.newPassword) {
      this.setState({ submitted: true });
      if (this.state.avatarImage || this.state.backgroundImage) {
        this.props.updateImages({
          avatar: this.state.avatarImage,
          background: this.state.backgroundImage
        }); 
      }
      if (this.state.oldPassword && this.state.newPassword) {
        this.props.changePassword({
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword
        })
      }
    }
  }

  handleDeleteButton = () => {
    this.setState({ deleteDialog: true, submitted: true });
  }

  handleDeleteDialog = (type) => {
    switch(type) {
      case 'no':
        this.setState({ submitted: false, deleteDialog: false });
        break;
      case 'yes':
        this.props.deleteAccount();
        break;
      case 'outside':
        this.setState({ submitted: false, deleteDialog: false });
        break;
      default: 
        break;
    }
  }

  handleFileChange = e => {
    const name = e.target.name;
    const file = e.target.files[0];
    if (file) {
      this.setState({
        [name]: file,
        [name + 'Link']: window.URL.createObjectURL(file)
      });
    }
  }

  handlePasswordInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { classes, auth, passwordChangeErrorMessage, profile } = this.props;
    if (!auth.uid) return <Redirect to="/" />
    return (
      <div className="user">
        <form onSubmit={this.handleUserSubmit} className="user__form">
          <div className="user__errors">
            <p>{passwordChangeErrorMessage ? passwordChangeErrorMessage : ' '}</p>
          </div>
          <p className="user__settings-title">Avatar<span className="title-small"> 64x64</span></p>
          <div className="settings-group">
            <img className="settings__avatar" alt="" src={this.state.avatarImageLink ? this.state.avatarImageLink : profile.avatar}></img>
            <input onChange={this.handleFileChange} name="avatarImage" className="settings__file" type="file" accept="image/*" ></input>
          </div>
          <p className="user__settings-title">Background<span className="title-small"> 250x180</span></p>
          <div className="settings-group">
            <img className="settings__background" alt="" src={this.state.backgroundImageLink ? this.state.backgroundImageLink : profile.background}></img>
            <input onChange={this.handleFileChange} name="backgroundImage" className="settings__file" type="file" accept="image/*"></input>
          </div>
          <p className="user__settings-title">Password</p>
          <div className="settings-group">
            <input onChange={this.handlePasswordInput} name="oldPassword" type="password" placeholder="Your old password" className="user__password"></input>
            <input onChange={this.handlePasswordInput} name="newPassword" type="password" placeholder="Your new password" className="user__password"></input>
          </div>
          <div className="settings-group">
            <Button
              disabled={this.state.submitted}
              type="submit"
              variant="contained"
              className={classes.save}
            > { this.state.submitted ? <CircularProgress className={classes.loader} size={20} /> : 'Save' } </Button>
            <Button
              disabled={this.state.submitted}
              variant="contained"
              className={classes.delete}
              onClick={this.handleDeleteButton}
            > { this.state.submitted ? <CircularProgress className={classes.loader} size={20} /> : 'Delete account' } </Button>
          </div>
        </form>
        {
          this.state.deleteDialog ? <Dialog onClick={this.handleDeleteDialog} /> : '' 
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    passwordChange: state.user.passwordChange,
    passwordChangeError: state.user.passwordChangeError,
    passwordChangeErrorMessage: state.user.passwordChangeErrorMessage,
    userChange: state.user.avatarUpdated || state.user.backgroundUpdated || state.user.passwordChange
  }
}

export default connect(mapStateToProps, {updateImages, changePassword, deleteAccount})(withStyles(styles)(User));
