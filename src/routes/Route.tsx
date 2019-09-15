import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { store } from '../store';

interface Props extends RouteProps {
  isPrivate?: boolean;
}

export default function RouterWrapper({
  component,
  isPrivate = false,
  ...rest
}: Props) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Component: any = component;
  return <Route {...rest} render={props => <Component {...props} />} />;
}
