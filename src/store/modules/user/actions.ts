import { User } from './types';

export function updateProfileRequest(data: User) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(user: User) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { user },
  };
}

export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}
