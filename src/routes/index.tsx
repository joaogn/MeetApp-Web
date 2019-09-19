import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Meetup from '../pages/Meetup';
import EditMeetup from '../pages/EditMeetup';
import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/meetup/:meetupId" component={Meetup} isPrivate />
      <Route path="/editmeetup" exact component={EditMeetup} isPrivate />
      <Route
        path="/editmeetup/:meetupId"
        exact
        component={EditMeetup}
        isPrivate
      />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
