import produce from 'immer';
import { ReducerAction, UserState } from './types';

export const INITIAL_STATE: UserState = {
  profile: { name: '', email: '' },
};

export default function user(state = INITIAL_STATE, action: ReducerAction) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        const { payload } = action;
        if (payload) {
          draft.profile = payload.user;
        }
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        const { payload } = action;
        if (payload) {
          draft.profile = payload.user;
        }
        break;
      }
      case '@user/UPDATE_PROFILE_FAILURE': {
        draft = INITIAL_STATE;
        break;
      }
      default:
    }
  });
}
