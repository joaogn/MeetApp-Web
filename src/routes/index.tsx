import React from 'react';
import { Switch } from 'react-router-dom';

import SingIn from '../pages/SingIn';
import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
