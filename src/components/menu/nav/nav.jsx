import React, { Component } from 'react';
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import './nav.css';

class Nav extends Component {
  render() {
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
                <Link to="/app/today">
                    <Icon className="nav__item__icon" small>today</Icon>
                    <p>Today</p>
                </Link>
            </li>
            <li className="nav__item">
                <Link to="/app/tomorrow">
                    <Icon className="nav__item__icon" small>event</Icon>
                    <p>Tomorrow</p>
                </Link>
            </li>
            <li className="nav__item">
                <Link to="/app/week">
                    <Icon className="nav__item__icon" small>next_week</Icon>
                    <p>Next 7 days</p>
                </Link>
            </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
