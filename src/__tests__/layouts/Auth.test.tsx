import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { useSelector } from 'react-redux';
import faker from 'faker';
import { render } from '@testing-library/react';
import Auth from 'pages/_layouts/auth';
import Profile from 'pages/Profile';
import { Router } from 'react-router-dom';
import history from 'services/history';

const anySelector: any = useSelector;

const name = faker.name.firstName();
const email = faker.internet.email();
jest.mock('react-redux');

beforeAll(() => {
  anySelector.mockImplementation((cb: any) =>
    cb({
      user: {
        profile: {
          name,
          email,
        },
      },
    })
  );
});

describe('Auth layout page', () => {
  it('Should rendering children', async () => {
    const { queryByTestId } = render(
      <Auth>
        <Router history={history}>
          <Profile />
        </Router>
      </Auth>
    );
    expect(queryByTestId('profile-content')).toBeTruthy();
    expect(queryByTestId('auth-layout')).toBeTruthy();
  });
});
