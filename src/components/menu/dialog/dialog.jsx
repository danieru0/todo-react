import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './dialog.css';

const materialTheme = createMuiTheme({
    typography: {
        useNextVariants: true
    }
});

const styles = {
    delete: {
        backgroundColor: '#e00032',
        color: '#ffffff',
        '&:hover': {
          backgroundColor: '#f36c60'
        }
    }
}

class DialogComponent extends Component {
  constructor() {
    super();
    this.state = {
        open: true
    }
  }

  handleClose = () => {
      this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;
    return (
        <MuiThemeProvider theme={materialTheme}>
            <Dialog
                open={this.state.open}
                onClose={(e) => { this.props.onClick('outside'); this.handleClose(); }}
            >
                <DialogTitle id="alert-dialog-title">{'Are you sure about that?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting your account means removing all your tasks.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => { this.props.onClick('no'); this.handleClose(); }}>No</Button>
                    <Button className={classes.delete} variant="contained" color="secondary" onClick={(e) => { this.props.onClick('yes'); this.handleClose(); }}>Yes</Button>
                </DialogActions>
            </Dialog>
        </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(DialogComponent);
