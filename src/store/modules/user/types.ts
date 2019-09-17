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

export interface Action {
  type: string;
  payload: {
    profile: User;
    user: User;
    data: User;
  };
}
