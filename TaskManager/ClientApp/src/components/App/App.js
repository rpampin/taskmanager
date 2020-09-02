import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from '../Layout';
import { Home } from '../Home';
import { FetchData } from '../FetchData';
import { Counter } from '../Counter';
import { Task, TaskForm } from '../Task';

import './App.css';

export class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/counter' component={Counter} />
          <Route path='/fetch-data' component={FetchData} />
          <Route exact path='/tasks' component={Task} />
          <Route path='/tasks/task/:id?' component={TaskForm} />
        </Switch>
      </Layout>
    );
  }
}
