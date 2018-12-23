import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import Nav from './components/menu/nav/nav';
import Login from './components/auth/login/login';
import Register from './components/auth/register/register';
import Head from './components/todo/head/head';
import User from './components/todo/user/user';
import Snackbar from './components/menu/snackbar/snackbar';

class App extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <BrowserRouter>
        <div className="app">
          <Nav />
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/app/user" component={User}/>
            <Route path="/app/:page" component={Head}/>
            <Route path="/app" component={Head}/>
          </Switch>
          <Snackbar />
        </div>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
