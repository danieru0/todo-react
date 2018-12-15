import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './dialog.css';

class DialogComponent extends Component {
  constructor(props) {
    super();
    this.state = {
        open: true
    }
  }

  handleClose = () => {
      this.setState({ open: false });
  }

  render() {
    return (
        <Dialog
            open={this.state.open}
            onClose={this.handleClose}
        >
            <DialogTitle id="alert-dialog-title">{'Are you sure about that?'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Deleting your account means removing all your tasks.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => { this.props.onClick('no'); this.handleClose(); }}>No</Button>
                <Button onClick={(e) => { this.props.onClick('yes'); this.handleClose(); }}>Yes!</Button>
            </DialogActions>
        </Dialog>
    );
  }
}

export default DialogComponent;
