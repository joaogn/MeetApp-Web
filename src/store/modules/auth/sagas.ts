import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import { SignInSagaAction, SignUpSagaAction, PersistSagaAction } from './types';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }: SignInSagaAction) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({ payload }: SignUpSagaAction) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    yield history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados');
    yield put(signFailure());
  }
}

export function* setToken({ payload }: PersistSagaAction) {
  if (!payload) {
    return;
  }
  const { auth } = payload;
  if (auth) {
    yield (api.defaults.headers.Authorization = `Bearer ${auth.token}`);
  }
}

export function* signOut() {
  yield history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
