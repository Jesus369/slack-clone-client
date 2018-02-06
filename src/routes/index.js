import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Home'
import Register from './Register'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/register' exact component={Register} />
    </Switch>
  </BrowserRouter>
)

/* exact means that it is matching to what is presented */
