import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { toast } from 'react-toastify';
import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';
import BannerInput from 'pages/EditMeetup/BannerInput';
import api from 'services/api';

const apiMock = new MockAdapter(api);

describe('BannerInput component', () => {
  it('Should load image', async () => {
    const fileResponse = {
      id: faker.random.number(),
      name: faker.system.commonFileName('.jpg'),
      path: `${faker.random.uuid}.jpg`,
      url: faker.image.business(),
    };

    const { getByPlaceholderText } = render(<BannerInput name="banner_id" />);

    const bannerInput = getByPlaceholderText(
      'Selecionar Imagem'
    ) as HTMLInputElement;

    apiMock.onPost('files').reply(200, fileResponse);
    const file = new File(['(⌐□_□)'], fileResponse.name, { type: 'image/jpg' });
    fireEvent.change(bannerInput, { target: { files: [file] } });

    await wait(() => {});

    expect(bannerInput.getAttribute('data-file')).toEqual(
      String(fileResponse.id)
    );
  });

  it('Should error to load image', async () => {
    toast.error = jest.fn();
    const { getByPlaceholderText } = render(<BannerInput name="banner_id" />);

    const bannerInput = getByPlaceholderText(
      'Selecionar Imagem'
    ) as HTMLInputElement;

    apiMock.onPost('files').reply(500);
    const file = new File(['(⌐□_□)'], faker.system.commonFileName('.jpg'), {
      type: 'image/jpg',
    });
    fireEvent.change(bannerInput, { target: { files: [file] } });

    await wait(() => {});

    expect(toast.error).toHaveBeenCalled();
  });
});
