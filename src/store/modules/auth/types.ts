export interface User {
  name: string;
  email: string;
}

export interface SignState {
  token: string | null;
  signed: boolean;
  loading: boolean;
}

export interface Action {
  type: string;
  payload: {
    auth: SignState;
    token: string | null;
    name: string;
    email: string;
    password: string;
  };
}
