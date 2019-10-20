import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import faker from 'faker';
import Profile from 'pages/Profile';
import { updateProfileRequest } from 'store/modules/user/actions';
import { Router } from 'react-router-dom';
import history from 'services/history';

const anyDispatch: any = useDispatch;
const anySelector: any = useSelector;

jest.mock('react-redux');

const originalName = faker.name.firstName();
const originalEmail = faker.internet.email();
const name = faker.name.firstName();
const email = faker.internet.email();

beforeAll(() => {
  anySelector.mockImplementation((cb: any) =>
    cb({
      user: {
        profile: {
          name: originalName,
          email: originalEmail,
        },
      },
    })
  );
});

describe('Profile page', () => {
  it('Should Load data from redux', async () => {
    const { getByTestId } = render(
      <Router history={history}>
        <Profile />
      </Router>
    );
    const nameInput = getByTestId('name-input') as HTMLInputElement;
    const emailInput = getByTestId('email-input') as HTMLInputElement;
    expect(nameInput.value).toEqual(originalName);
    expect(emailInput.value).toEqual(originalEmail);
  });

  it('Should update profile', async () => {
    const dispatch = jest.fn();
    anyDispatch.mockReturnValue(dispatch);

    const { getByTestId } = render(
      <Router history={history}>
        <Profile />
      </Router>
    );

    fireEvent.change(getByTestId('name-input'), {
      target: { value: name },
    });
    fireEvent.change(getByTestId('email-input'), {
      target: { value: email },
    });
    fireEvent.click(getByTestId('profile-submit'));

    await wait(() => {});

    expect(dispatch).toHaveBeenCalledWith(
      updateProfileRequest({
        name,
        email,
        oldPassword: '',
        password: '',
        confirmPassword: '',
      })
    );
  });

  it('Should error name is required', async () => {
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <Profile />
      </Router>
    );
    fireEvent.change(getByTestId('name-input'), {
      target: { value: '' },
    });
    fireEvent.change(getByTestId('email-input'), {
      target: { value: email },
    });
    fireEvent.change(getByTestId('oldpassword-input'), {
      target: { value: '' },
    });
    fireEvent.click(getByTestId('profile-submit'));
    await wait(() => {});
    expect(getByText('O nome é obrigatório')).toBeTruthy();
  });

  it('Should error not valid email', async () => {
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <Profile />
      </Router>
    );
    fireEvent.change(getByTestId('name-input'), {
      target: { value: name },
    });
    fireEvent.change(getByTestId('email-input'), {
      target: { value: faker.name.firstName() },
    });
    fireEvent.click(getByTestId('profile-submit'));
    await wait(() => {});
    expect(getByText('Insira um email valido')).toBeTruthy();
  });

  it('Should error email is required', async () => {
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <Profile />
      </Router>
    );
    fireEvent.change(getByTestId('name-input'), {
      target: { value: name },
    });
    fireEvent.change(getByTestId('email-input'), {
      target: { value: '' },
    });
    fireEvent.click(getByTestId('profile-submit'));
    await wait(() => {});
    expect(getByText('O email é obrigatório')).toBeTruthy();
  });

  it('Should error password is required', async () => {
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <Profile />
      </Router>
    );
    fireEvent.change(getByTestId('name-input'), {
      target: { value: name },
    });
    fireEvent.change(getByTestId('email-input'), {
      target: { value: email },
    });
    fireEvent.change(getByTestId('oldpassword-input'), {
      target: { value: faker.internet.password(8) },
    });
    fireEvent.click(getByTestId('profile-submit'));
    await wait(() => {});
    expect(getByText('A Senha é Obrigatoria')).toBeTruthy();
  });

  it('Should error confirm password is required', async () => {
    const newPassword = faker.internet.password(8);
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <Profile />
      </Router>
    );
    fireEvent.change(getByTestId('name-input'), {
      target: { value: name },
    });
    fireEvent.change(getByTestId('email-input'), {
      target: { value: email },
    });
    fireEvent.change(getByTestId('oldpassword-input'), {
      target: { value: newPassword },
    });
    fireEvent.change(getByTestId('password-input'), {
      target: { value: newPassword },
    });
    fireEvent.change(getByTestId('confirmpassword-input'), {
      target: { value: '' },
    });
    fireEvent.click(getByTestId('profile-submit'));
    await wait(() => {});
    expect(getByText('A senha confirmada está errada')).toBeTruthy();
  });
});
