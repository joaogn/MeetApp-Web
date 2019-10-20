import produce from 'immer';

import { SignState, ReducerAction } from './types';

export const INITIAL_STATE: SignState = {
  token: undefined,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action: ReducerAction) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@auth/SIGN_IN_SUCCESS': {
        const { payload } = action;
        draft.token = payload && payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = undefined;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
