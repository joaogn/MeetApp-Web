import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import faker from 'faker';
import Header from 'components/Header';
import { signOut } from 'store/modules/auth/actions';
import { Router } from 'react-router-dom';
import history from 'services/history';

const anyDispatch: any = useDispatch;
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

describe('Header component', () => {
  it('Should Load data from redux', async () => {
    const { queryByText } = render(
      <Router history={history}>
        <Header />
      </Router>
    );
    expect(queryByText(name)).toBeTruthy();
  });

  it('Should logout to click in exit button', async () => {
    const dispatch = jest.fn();
    anyDispatch.mockReturnValue(dispatch);
    const { getByTestId } = render(
      <Router history={history}>
        <Header />
      </Router>
    );
    fireEvent.click(getByTestId('exit-button'));
    expect(dispatch).toHaveBeenCalledWith(signOut());
    expect(history.location.pathname).toBe(`/`);
  });
});
