import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import faker from 'faker';
import Route from 'routes/Route';
import SignIn from 'pages/SignIn';
import { Router } from 'react-router-dom';
import history from 'services/history';

const anySelector: any = useSelector;

const name = faker.name.firstName();
const email = faker.internet.email();
jest.mock('react-redux');

describe('Route component', () => {
  it('Should render auth layout', async () => {
    anySelector.mockImplementation((cb: any) =>
      cb({
        auth: {
          signed: false,
        },
      })
    );
    const { queryByTestId } = render(
      <Router history={history}>
        <Route component={SignIn} />
      </Router>
    );

    expect(queryByTestId('auth-layout')).toBeTruthy();
    expect(queryByTestId('default-layout')).toBeNull();
  });

  it('Should render default layout', async () => {
    anySelector.mockImplementation((cb: any) =>
      cb({
        auth: {
          signed: true,
        },
        user: {
          profile: {
            name,
            email,
          },
        },
      })
    );
    const { queryByTestId } = render(
      <Router history={history}>
        <Route component={SignIn} isPrivate />
      </Router>
    );

    expect(queryByTestId('auth-layout')).toBeNull();
    expect(queryByTestId('default-layout')).toBeTruthy();
  });

  it('Should redirect to dashboad', async () => {
    anySelector.mockImplementation((cb: any) =>
      cb({
        auth: {
          signed: true,
        },
        user: {
          profile: {
            name,
            email,
          },
        },
      })
    );
    render(
      <Router history={history}>
        <Route component={SignIn} />
      </Router>
    );

    expect(history.location.pathname).toBe('/dashboard');
  });

  it('Should redirect to home', async () => {
    history.location.pathname = '/dashboard';
    anySelector.mockImplementation((cb: any) =>
      cb({
        auth: {
          signed: false,
        },
      })
    );
    render(
      <Router history={history}>
        <Route component={SignIn} isPrivate />
      </Router>
    );

    expect(history.location.pathname).toBe('/');
  });
});
