import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { updateCity } from '../../../store/actions/weatherActions';
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
        open: true,
        city: null,
        error: false
    }
  }

  handleClose = () => {
      this.setState({ open: false });
  }

  handleCityInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCityChange = () => {
    if (this.state.city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&APPID=1b219e54535ffe5f5a6a4442ea878ed2`)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error();
            }
        })
        .then(resp => {
            if (resp) {
                this.props.updateCity(resp.name);
                this.setState({ open: false });
                this.props.onClick('cancel');
            }
        }).catch(() => {
            this.setState({ error: true });
        })
    }
  }

  render() {
    const { classes, dialogType } = this.props;
    return (
        <MuiThemeProvider theme={materialTheme}>
            {
                dialogType === 'delete-account' ? (
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
                ) : (
                    ''
                )
            }
            {
                dialogType === 'weather-city' ? (
                    <Dialog
                        open={this.state.open}
                        onClose={(e) => { this.props.onClick('outside'); this.handleClose(); }}
                    >
                        <DialogTitle id="alert-dialog-title">{'Change weather city'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Type your city name here.
                            </DialogContentText>
                            <TextField 
                                error={this.state.error}
                                autoFocus
                                margin="dense"
                                id="name"
                                name="city"
                                label="City name"
                                type="text"
                                fullWidth
                                onChange={this.handleCityInputChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => { this.props.onClick('cancel'); this.handleClose(); }}>Cancel</Button>
                            <Button onClick={this.handleCityChange}>Change</Button>
                        </DialogActions>
                    </Dialog>
                ) : (
                    ''
                )
            }
        </MuiThemeProvider>
    );
  }
}

export default connect(null, { updateCity })(withStyles(styles)(DialogComponent));
