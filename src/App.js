import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Nav from './components/menu/nav/nav';
import Login from './components/auth/login/login';
import Register from './components/auth/register/register';
import Head from './components/todo/head/head';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="app">
        <Nav />
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/app" component={Head}/>
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
