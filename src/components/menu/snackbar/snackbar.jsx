import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { Icon, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { connect } from 'react-redux';

const materialTheme = createMuiTheme({
    typography: {
        useNextVariants: true
    }
})

class Notification extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }

    componentWillReceiveProps() {
        this.setState({ open: true });
    }

    handleClose = (event, reason) => {
        this.setState({ open: false });
    }

    render() {
        return (
            <MuiThemeProvider theme={materialTheme}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={2000}
                    onClose={this.handleClose}
                    message={<span id="message-id">{this.props.message ? this.props.message : ''}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <Icon>close</Icon>
                        </IconButton>
                    ]}
                />
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = state => {
    return {
        changeId: state.todo.snackbar,
        message: state.todo.message
    }
}

export default  connect(mapStateToProps, null)(Notification);