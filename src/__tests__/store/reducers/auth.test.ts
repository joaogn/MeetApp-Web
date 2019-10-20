import reducer, { INITIAL_STATE } from 'store/modules/auth/reducer';
import {
  signInSuccess,
  signInRequest,
  signFailure,
  signOut,
} from 'store/modules/auth/actions';
import faker from 'faker';

describe('Auth reducer', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, { type: '' });
    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('@auth/SIGN_IN_REQUEST', () => {
    const state = reducer(
      INITIAL_STATE,
      signInRequest(faker.internet.email(), faker.internet.password())
    );
    expect(state.token).toBeUndefined();
    expect(state.signed).toStrictEqual(false);
    expect(state.loading).toStrictEqual(true);
  });

  it('@auth/SIGN_IN_SUCCESS', () => {
    const token = faker.random.uuid();
    const state = reducer(
      INITIAL_STATE,
      signInSuccess(token, {
        name: faker.name.findName(),
        email: faker.internet.email(),
      })
    );
    expect(state.token).toStrictEqual(token);
    expect(state.signed).toStrictEqual(true);
    expect(state.loading).toStrictEqual(false);
  });

  it('@auth/SIGN_IN_FAILURE', () => {
    const state = reducer(INITIAL_STATE, signFailure());
    expect(state.token).toBeUndefined();
    expect(state.signed).toStrictEqual(false);
    expect(state.loading).toStrictEqual(false);
  });

  it('@auth/SIGN_IN_FAILURE', () => {
    const state = reducer(INITIAL_STATE, signOut());
    expect(state.token).toBeUndefined();
    expect(state.signed).toStrictEqual(false);
    expect(state.loading).toStrictEqual(false);
  });
});
