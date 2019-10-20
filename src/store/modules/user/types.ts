export interface User {
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
  confirmPassword?: string;
}

export interface UserState {
  profile: User;
}

export interface ReducerAction {
  type: string;
  payload?: {
    user: User;
  };
}

export interface SagaAction {
  type: string;
  payload: {
    data: User;
  };
}
