import produce from 'immer';
import { Action, UserState } from './types';

const INITIAL_STATE: UserState = {
  profile: { name: '', email: '' },
};

export default function user(state = INITIAL_STATE, action: Action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft = INITIAL_STATE;
        break;
      }
      default:
    }
  });
}
