import reducer, { INITIAL_STATE } from 'store/modules/user/reducer';
import {
  updateProfileSuccess,
  updateProfileFailure,
} from 'store/modules/user/actions';
import { signInSuccess } from 'store/modules/auth/actions';
import faker from 'faker';

describe('User reducer', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, { type: '' });
    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('@auth/SIGN_IN_SUCCESS', () => {
    const token = faker.random.uuid();
    const name = faker.name.findName();
    const email = faker.internet.email();
    const state = reducer(
      INITIAL_STATE,
      signInSuccess(token, {
        name,
        email,
      })
    );
    expect(state.profile).toStrictEqual({ name, email });
  });

  it('@user/UPDATE_PROFILE_SUCCESS', () => {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const state = reducer(INITIAL_STATE, updateProfileSuccess({ name, email }));
    expect(state.profile).toStrictEqual({ name, email });
  });

  it('@user/UPDATE_PROFILE_FAILURE', () => {
    const state = reducer(INITIAL_STATE, updateProfileFailure());
    expect(state).toStrictEqual(INITIAL_STATE);
  });
});
