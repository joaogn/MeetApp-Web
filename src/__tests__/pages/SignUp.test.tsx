import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import faker from 'faker';
import SignUp from 'pages/SignUp';
import { signUpRequest } from 'store/modules/auth/actions';
import { Router } from 'react-router-dom';
import history from 'services/history';

const anyDispatch: any = useDispatch;
const anySelector: any = useSelector;

const name = faker.name.firstName();
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
        <SignUp />
      </Router>
    );

    fireEvent.change(getByTestId('name-input'), {
      target: { value: name },
    });
    fireEvent.change(getByTestId('email-input'), {
      target: { value: email },
    });
    fireEvent.change(getByTestId('password-input'), {
      target: { value: password },
    });
    fireEvent.click(getByTestId('signup-submit'));
    await wait(() => {});
    expect(dispatch).toHaveBeenCalledWith(signUpRequest(name, email, password));
  });

  it('Should error name is required', async () => {
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <SignUp />
      </Router>
    );
    fireEvent.change(getByTestId('email-input'), {
      target: { value: email },
    });
    fireEvent.change(getByTestId('password-input'), {
      target: { value: password },
    });
    fireEvent.click(getByTestId('signup-submit'));
    await wait(() => {});
    expect(getByText('O nome é obrigatorio')).toBeTruthy();
  });

  it('Should error not valid email', async () => {
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <SignUp />
      </Router>
    );
    fireEvent.change(getByTestId('name-input'), {
      target: { value: name },
    });
    fireEvent.change(getByTestId('email-input'), {
      target: { value: faker.name.firstName() },
    });
    fireEvent.change(getByTestId('password-input'), {
      target: { value: password },
    });
    fireEvent.click(getByTestId('signup-submit'));
    await wait(() => {});
    expect(getByText('Insira um email valido')).toBeTruthy();
  });

  it('Should error email is required', async () => {
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <SignUp />
      </Router>
    );
    fireEvent.change(getByTestId('name-input'), {
      target: { value: name },
    });
    fireEvent.change(getByTestId('password-input'), {
      target: { value: password },
    });
    fireEvent.click(getByTestId('signup-submit'));
    await wait(() => {});
    expect(getByText('O email é obrigatório')).toBeTruthy();
  });

  it('Should error password is required', async () => {
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <SignUp />
      </Router>
    );
    fireEvent.change(getByTestId('name-input'), {
      target: { value: name },
    });
    fireEvent.change(getByTestId('email-input'), {
      target: { value: email },
    });
    fireEvent.click(getByTestId('signup-submit'));
    await wait(() => {});
    expect(getByText('A senha é obrigatória')).toBeTruthy();
  });
});
