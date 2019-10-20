import { runSaga } from 'redux-saga';
import { toast } from 'react-toastify';
import {
  signUpRequest,
  signInRequest,
  signInSuccess,
  signFailure,
} from 'store/modules/auth/actions';
import { signIn, signUp, setToken, signOut } from 'store/modules/auth/sagas';
import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';

import history from 'services/history';
import api from 'services/api';

const apiMock = new MockAdapter(api);

const name = faker.name.findName();
const email = faker.internet.email();
const password = faker.internet.password();

describe('Auth saga', () => {
  it('should signIn success', async () => {
    const dispatch = jest.fn();

    const response = {
      user: {
        id: faker.random.number(),
        name,
        email,
      },
      token: faker.random.uuid(),
    };

    apiMock.onPost('sessions').reply(200, response);
    await runSaga(
      { dispatch },
      signIn,
      signInRequest(email, password)
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(
      signInSuccess(response.token, response.user)
    );
  });

  it('should signIn failure', async () => {
    toast.error = jest.fn();
    const dispatch = jest.fn();

    apiMock.onPost('sessions').reply(500);

    await runSaga(
      { dispatch },
      signIn,
      signInRequest(email, password)
    ).toPromise();
    expect(toast.error).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(signFailure());
  });

  it('should signUp success', async () => {
    history.push = jest.fn();
    const dispatch = jest.fn();
    const response = {
      id: faker.random.number(),
      name,
      email,
    };

    apiMock.onPost('users').reply(200, response);

    await runSaga(
      { dispatch },
      signUp,
      signUpRequest(name, email, password)
    ).toPromise();
    expect(history.push).toHaveBeenCalled();
  });

  it('should signUp failure', async () => {
    toast.error = jest.fn();
    const dispatch = jest.fn();
    apiMock.onPost('users').reply(500);

    await runSaga(
      { dispatch },
      signUp,
      signUpRequest(name, email, password)
    ).toPromise();
    expect(toast.error).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(signFailure());
  });

  it('should set Token on api', async () => {
    const dispatch = jest.fn();
    const token = faker.random.uuid();
    apiMock.onPost('users').reply(500);

    await runSaga({ dispatch }, setToken, {
      type: 'persist/REHYDRATE',
      payload: {
        auth: {
          token,
          signed: true,
          loading: false,
        },
      },
    }).toPromise();

    expect(api.defaults.headers.Authorization).toStrictEqual(`Bearer ${token}`);
  });

  it('should not set Token on api not auth in persist', async () => {
    const dispatch = jest.fn();
    api.defaults.headers.Authorization = '';
    apiMock.onPost('users').reply(500);

    await runSaga({ dispatch }, setToken, {
      type: 'persist/REHYDRATE',
      payload: {},
    }).toPromise();

    expect(api.defaults.headers.Authorization).toStrictEqual('');
  });

  it('should not set Token on api not have persist', async () => {
    const dispatch = jest.fn();
    api.defaults.headers.Authorization = '';
    apiMock.onPost('users').reply(500);

    await runSaga({ dispatch }, setToken, {
      type: 'persist/REHYDRATE',
    }).toPromise();

    expect(api.defaults.headers.Authorization).toStrictEqual('');
  });

  it('should sing out', async () => {
    history.push = jest.fn();
    const dispatch = jest.fn();
    jest.fn(history.push);
    api.defaults.headers.Authorization = '';
    apiMock.onPost('users').reply(500);

    await runSaga({ dispatch }, signOut).toPromise();

    expect(history.push).toHaveBeenCalled();
  });
});
