import React, { Component } from 'react';
import { updateImages } from '../../../store/actions/userActions';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '../../menu/dialog/dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import './user.css';

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
      backgroundImageLink: null
    }
  }

  handleUserSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    this.props.updateImages({
      avatar: this.state.avatarImage,
      background: this.state.backgroundImage
    });
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
        this.setState({ submitted: false, deleteDialog: false });
        alert('deleting account...');
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

  render() {
    const { classes } = this.props;
    return (
      <div className="user">
        <form onSubmit={this.handleUserSubmit} className="user__form">
          <p className="user__settings-title">Avatar<span className="title-small"> 64x64</span></p>
          <div className="settings-group">
            <img className="settings__avatar" alt="" src={this.state.avatarImageLink ? this.state.avatarImageLink : "https://react-materialize.github.io/img/yuna.jpg"}></img>
            <input onChange={this.handleFileChange} name="avatarImage" className="settings__file" type="file" accept="image/*" ></input>
          </div>
          <p className="user__settings-title">Background<span className="title-small"> 250x180</span></p>
          <div className="settings-group">
            <img className="settings__background" alt="" src={this.state.backgroundImageLink ? this.state.backgroundImageLink : "https://react-materialize.github.io/img/office.jpg"}></img>
            <input onChange={this.handleFileChange} name="backgroundImage" className="settings__file" type="file" accept="image/*"></input>
          </div>
          <p className="user__settings-title">Password</p>
          <div className="settings-group">
            <input name="old-password" type="password" placeholder="Your old password" className="user__password"></input>
            <input name="new-password" type="password" placeholder="Your new password" className="user__password"></input>
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

export default connect(null, {updateImages})(withStyles(styles)(User));
