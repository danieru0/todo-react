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
            open: false,
            message: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userChange !== this.props.userChange) {
            this.setState({ message: nextProps.userMessage });
        }
        if (nextProps.todoChange !== this.props.todoChange) {
            this.setState({ message: nextProps.todoMessage });
        }
        this.setState({ open: true });
    }

    handleClose = () => {
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
                    message={<span id="message-id">{this.state.message ? this.state.message : ''}</span>}
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
        todoChange: state.todo.snackbar,
        todoMessage: state.todo.message,
        userMessage: state.user.userMessage,
        userChange: state.user.avatarUpdated || state.user.backgroundUpdated || state.user.passwordChange
    }
}

export default connect(mapStateToProps, null)(Notification);