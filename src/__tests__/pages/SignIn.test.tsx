import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import faker from 'faker';
import SignIn from 'pages/SignIn';
import { signInRequest } from 'store/modules/auth/actions';
import { Router } from 'react-router-dom';
import history from 'services/history';

const anyDispatch: any = useDispatch;
const anySelector: any = useSelector;

const email = faker.internet.email();
const password = faker.internet.password();

jest.mock('react-redux');

beforeAll(() => {
  anySelector.mockImplementation((cb: any) =>
    cb({
      auth: { loading: false },
    })
  );
});

describe('SignIn page', () => {
  it('Should SignIn Success', async () => {
    const dispatch = jest.fn();
    anyDispatch.mockReturnValue(dispatch);

    const { getByTestId } = render(
      <Router history={history}>
        <SignIn />
      </Router>
    );

    fireEvent.change(getByTestId('email-input'), {
      target: { value: email },
    });
    fireEvent.change(getByTestId('password-input'), {
      target: { value: password },
    });
    fireEvent.click(getByTestId('signin-submit'));
    await wait(() => {});
    expect(dispatch).toHaveBeenCalledWith(signInRequest(email, password));
  });

  it('Should error not valid email', async () => {
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <SignIn />
      </Router>
    );

    fireEvent.change(getByTestId('email-input'), {
      target: { value: faker.name.firstName() },
    });
    fireEvent.change(getByTestId('password-input'), {
      target: { value: password },
    });
    fireEvent.click(getByTestId('signin-submit'));
    await wait(() => {});
    expect(getByText('Insira um email valido')).toBeTruthy();
  });

  it('Should error email is required', async () => {
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <SignIn />
      </Router>
    );

    fireEvent.change(getByTestId('password-input'), {
      target: { value: password },
    });
    fireEvent.click(getByTestId('signin-submit'));
    await wait(() => {});
    expect(getByText('O email é obrigatório')).toBeTruthy();
  });

  it('Should error password is required', async () => {
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <SignIn />
      </Router>
    );
    fireEvent.change(getByTestId('email-input'), {
      target: { value: email },
    });
    fireEvent.click(getByTestId('signin-submit'));
    await wait(() => {});
    expect(getByText('A senha é obrigatória')).toBeTruthy();
  });
});
