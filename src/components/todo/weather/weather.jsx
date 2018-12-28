import React, { Component } from 'react';
import './weather.css';
import { Icon } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    vertIcon: {
        color: '#ffffff'
    }
}

class Weather extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null
        }
    }

    hadleOpenMenu = e => {
        this.setState({ anchorEl: e.currentTarget });
    }

    handleCloseMenu = () => {
        this.setState({ anchorEl: null });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="weather">
                <div className="weather__button">
                    <IconButton
                        aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.hadleOpenMenu}
                    >
                        <Icon style={{ fontSize: 32 }} className={classes.vertIcon}>more_vert</Icon>
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleCloseMenu}
                    >
                        <MenuItem>Change city</MenuItem>
                    </Menu>
                </div>
                <div className="weather__info">
                    <div className="weather__city">
                        <img alt="" className="weather__icon" src="https://cdn3.iconfinder.com/data/icons/weather-344/142/cloudy-512.png"></img>
                        <p className="weather__city-name">Wroclaw, PL</p>
                    </div>
                    <div className="weather__temp">
                        <p>3&deg;C</p>
                    </div>
                    <div className="weather__details">
                        <div className="weather__container">
                            <div className="weather__box">
                                <p>Pressure</p>
                                <p>1024</p>
                            </div>
                            <span className="weather__line"></span>
                            <div className="weather__box">
                                <p>Humidity</p>
                                <p>1123</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Weather);