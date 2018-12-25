import React, { Component } from 'react';
import { Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/authActions';
import Redirect from 'react-router-dom/Redirect';
import './nav.css';

class Nav extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.signOut !== this.props.signOut) {
            return <Redirect to="/" />
        }
    }

    handleLogoutBtn = () => {
        this.props.signOut();
    }

    render() {
        const { auth, profile } = this.props;
        if (!auth.uid) return '';
        return (
        <div className="nav">
            <Link to="/app/user" style={
                    profile.background ? {backgroundImage: `url(${profile.background})`} : {background: '#9e9e9e'}
                } className="nav__user">
                <div className="nav__info">
                    <img alt="" src={profile.avatar}></img>
                    <p className="nav__name">{profile.full_name}</p>
                    <p className="nav__email">{profile.email}</p>
                </div>
            </Link>
            <ul className="nav__links">
                <li className="nav__item">
                    <Link to="/app">
                        <Icon className="nav__item__icon">date_range</Icon>
                        <p>All</p>
                    </Link>
                </li>
                <li className="nav__item">
                    <Link to="/app/today">
                        <Icon className="nav__item__icon">today</Icon>
                        <p>Today</p>
                    </Link>
                </li>
                <li className="nav__item">
                    <Link to="/app/tomorrow">
                        <Icon className="nav__item__icon">event</Icon>
                        <p>Tomorrow</p>
                    </Link>
                </li>
                <li className="nav__item">
                    <Link to="/app/week">
                        <Icon className="nav__item__icon">next_week</Icon>
                        <p>Next 7 days</p>
                    </Link>
                </li>
                <div className="nav__line"></div>
                <li className="nav__item">
                    <Link to="/app/completed">
                        <Icon className="nav__item__icon">done</Icon>
                        <p>Completed</p>
                    </Link>
                </li>
                <li className="nav__item">
                    <Link to="/app/overdue">
                        <Icon className="nav__item__icon">error</Icon>
                        <p>Overdue</p>
                    </Link>
                </li>
            </ul>
            <div className="nav__bottom">
                <button onClick={this.handleLogoutBtn} className="btn-logout">
                    <Icon fontSize="small" className="logout__icon">exit_to_app</Icon>Log out
                </button>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        signOut: state.auth.authSignOut
    }
}

export default connect(mapStateToProps, {signOut})(Nav);
