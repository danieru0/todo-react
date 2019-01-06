import React, { Component } from 'react';
import './weather.css';
import { Icon } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getWeather } from '../../../store/actions/weatherActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '../../menu/dialog/dialog';

const styles = {
    vertIcon: {
        color: '#ffffff'
    },
    loader: {
        color: '#ffffff'
    }
}

class Weather extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            changeCity: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.city !== this.props.profile.city) {
            this.props.getWeather(nextProps.profile.city);
        }
    }

    hadleOpenMenu = e => {
        this.setState({ anchorEl: e.currentTarget });
    }

    handleCloseMenu = () => {
        this.setState({ anchorEl: null });
    }

    refreshWeather = () => {
        this.setState({ anchorEl: null });
        this.props.getWeather(this.props.profile.city);
    }

    changeCityButton = () => {
        this.setState({ anchorEl: null, changeCity: true });
    }

    handleChangeCity = type => {
        switch(type) {
            case 'cancel':
                this.setState({ changeCity: false });
                break;
            case 'outside':
                this.setState({ changeCity: false });
                break;
            default: break;
        }
    }

    render() {
        const { classes, weatherData } = this.props;
        return (
            <div className="weather">
                {
                    weatherData ? (
                        !weatherData.err ? (
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
                                    <MenuItem onClick={this.changeCityButton}>Change city</MenuItem>
                                    <MenuItem onClick={this.refreshWeather}>Refresh</MenuItem>
                                </Menu>
                                </div>
                                <div className="weather__info">
                                    <div className="weather__city">
                                        <img alt="" className="weather__icon" src={`/imgs/${weatherData.resp.weather[0].icon}.png`}></img>
                                        <p className="weather__city-name">{`${weatherData.resp.name}, ${weatherData.resp.sys.country}`}</p>
                                    </div>
                                    <div className="weather__temp">
                                        <p>{`${(weatherData.resp.main.temp).toFixed(0)}`}&deg;C</p>
                                    </div>
                                    <div className="weather__details">
                                        <div className="weather__container">
                                            <div className="weather__box">
                                                <p>Pressure</p>
                                                <p>{weatherData.resp.main.pressure}</p>
                                            </div>
                                            <span className="weather__line"></span>
                                            <div className="weather__box">
                                                <p>Humidity</p>
                                                <p>{weatherData.resp.main.humidity}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </> 
                        ) : (
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
                                    <MenuItem onClick={this.changeCityButton}>Change city</MenuItem>
                                    <MenuItem onClick={this.refreshWeather}>Refresh</MenuItem>
                                </Menu>
                                </div>
                                <div className="weather__info">
                                    <span className="weather__error">{weatherData.err}</span>
                                </div>
                            </>
                        )
                    ) : (
                        <div className="weather__info">
                            <CircularProgress  className={classes.loader} />
                        </div>
                    )
                }
                {
                    this.state.changeCity ? <Dialog dialogType="weather-city" onClick={this.handleChangeCity} /> : ''
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        profile: state.firebase.profile,
        weatherUpdate: state.weather.weatherUpdate,
        weatherData: state.weather.weatherData ? state.weather.weatherData : state.weather.weatherData
    }
}

export default connect(mapStateToProps, { getWeather })(withStyles(styles)(Weather));