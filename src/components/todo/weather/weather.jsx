import React, { Component } from 'react';
import './weather.css';
import { Icon } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getWeather } from '../../../store/actions/weatherActions';

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

    componentDidMount() {
        this.props.getWeather('Wroclaw');
    }

    hadleOpenMenu = e => {
        this.setState({ anchorEl: e.currentTarget });
    }

    handleCloseMenu = () => {
        this.setState({ anchorEl: null });
    }

    render() {
        const { classes, weatherData } = this.props;
        return (
            <div className="weather">
                {
                    weatherData ? (
                        <>
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
                                    <p className="weather__city-name">{`${weatherData.name}, ${weatherData.sys.country}`}</p>
                                </div>
                                <div className="weather__temp">
                                    <p>{`${weatherData.main.temp}`}&deg;C</p>
                                </div>
                                <div className="weather__details">
                                    <div className="weather__container">
                                        <div className="weather__box">
                                            <p>Pressure</p>
                                            <p>{weatherData.main.pressure}</p>
                                        </div>
                                        <span className="weather__line"></span>
                                        <div className="weather__box">
                                            <p>Humidity</p>
                                            <p>{weatherData.main.humidity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </>
                    ) : (
                        ''
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        weatherUpdate: state.weather.weatherUpdate,
        weatherData: state.weather.weatherData ? state.weather.weatherData.resp : state.weather.weatherData
    }
}

export default connect(mapStateToProps, { getWeather })(withStyles(styles)(Weather));