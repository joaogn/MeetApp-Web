import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { store } from '../store';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

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

  const Layout = signed ? DefaultLayout : AuthLayout;

  const Component: any = component;
  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}
