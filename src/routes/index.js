import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Home'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Home} />
    </Switch>
  </BrowserRouter>
)

/* exact means that it is matching to what is presented */
