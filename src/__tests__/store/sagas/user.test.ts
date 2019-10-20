import { runSaga } from 'redux-saga';
import { toast } from 'react-toastify';
import {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} from 'store/modules/user/actions';
import { updateProfile } from 'store/modules/user/sagas';
import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';

import api from 'services/api';

const apiMock = new MockAdapter(api);

const response = {
  id: faker.random.number(),
  name: faker.name.findName(),
  email: faker.internet.email(),
};

describe('User saga', () => {
  it('Shoud update user', async () => {
    toast.success = jest.fn();
    const dispatch = jest.fn();
    apiMock.onPut('users').reply(200, response);

    await runSaga(
      { dispatch },
      updateProfile,
      updateProfileRequest(response)
    ).toPromise();
    expect(toast.success).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(updateProfileSuccess(response));
  });

  it('Shoud update failure', async () => {
    toast.error = jest.fn();
    const dispatch = jest.fn();

    apiMock.onPut('users').reply(500);

    await runSaga(
      { dispatch },
      updateProfile,
      updateProfileRequest(response)
    ).toPromise();
    expect(toast.error).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(updateProfileFailure());
  });
});
