import React, { Component } from 'react';
import { Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './nav.css';

class Nav extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return '';
    return (
      <div className="nav">
        <Link to="/app/user" className="nav__user">
            <div className="nav__info">
                <img alt="" src="https://react-materialize.github.io/img/yuna.jpg"></img>
                <p className="nav__name">Daniel Dąbrowski</p>
                <p className="nav__email">dabrowskidaniel006@gmail.com</p>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(Nav);
