import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import EditMeetup from 'pages/EditMeetup';
import { Router } from 'react-router-dom';
import history from 'services/history';
import api from 'services/api';

const apiMock = new MockAdapter(api);
const match: any = { params: { meetupId: faker.random.number() } };
const location: any = {};
const { meetupId } = match.params;

const response = {
  past: false,
  title: faker.lorem.words(),
  description: faker.lorem.paragraph(),
  location: faker.address.streetAddress(),
  date: '2019-10-16T20:00:00.000Z',
  banner_id: faker.random.number(),
  file: {
    path: `${faker.random.uuid}.jpg`,
    url: faker.image.nature(),
  },
};

describe('Meetup page', () => {
  it('Should load meetup info', async () => {
    apiMock.onGet(`meetups/${meetupId}`).reply(200, response);
    const { getByPlaceholderText, getByTestId } = render(
      <Router history={history}>
        <EditMeetup match={match} location={location} history={history} />
      </Router>
    );
    await wait(() => {});

    const titleInput = getByTestId('title-input') as HTMLInputElement;
    const descriptionInput = getByTestId(
      'description-input'
    ) as HTMLInputElement;
    const locationInput = getByTestId('location-input') as HTMLInputElement;
    const dateInput = getByPlaceholderText(
      'Data do meetup'
    ) as HTMLInputElement;
    const bannerInput = getByPlaceholderText(
      'Selecionar Imagem'
    ) as HTMLInputElement;

    expect(titleInput.value).toStrictEqual(response.title);
    expect(descriptionInput.value).toStrictEqual(response.description);
    expect(locationInput.value).toStrictEqual(response.location);
    expect(bannerInput.getAttribute('data-file')).toEqual(
      String(response.banner_id)
    );
    expect(dateInput.value).toStrictEqual(
      format(parseISO(response.date), "dd 'de' MMMM', às' HH'h'mm'm'", {
        locale: pt,
      })
    );
  });

  it('Should error to load meetup info', async () => {
    toast.error = jest.fn();
    apiMock.onGet(`meetups/${meetupId}`).reply(500);
    render(
      <Router history={history}>
        <EditMeetup match={match} location={location} history={history} />
      </Router>
    );
    await wait(() => {});
    expect(toast.error).toHaveBeenCalled();
    expect(history.location.pathname).toBe(`/dashboard`);
  });

  it('Should return validations erros meetup save', async () => {
    const match2: any = { params: undefined };
    const { getByTestId, queryByText } = render(
      <Router history={history}>
        <EditMeetup match={match2} location={location} history={history} />
      </Router>
    );
    await wait(() => {});
    fireEvent.click(getByTestId('save-button'));
    await wait(() => {});
    expect(queryByText('O Banner é obrigatório')).toBeTruthy();
    expect(queryByText('O Titulo é obrigatório')).toBeTruthy();
    expect(queryByText('A Descrição é obrigatória')).toBeTruthy();
    expect(queryByText('A Data é obrigatória')).toBeTruthy();
    expect(queryByText('A Localização é obrigatória')).toBeTruthy();
  });

  it('Should change meetup info and save', async () => {
    apiMock.onGet(`meetups/${meetupId}`).reply(200, response);
    const { getByPlaceholderText, getByTestId } = render(
      <Router history={history}>
        <EditMeetup match={match} location={location} history={history} />
      </Router>
    );
    await wait(() => {});

    const titleInput = getByTestId('title-input') as HTMLInputElement;
    const descriptionInput = getByTestId(
      'description-input'
    ) as HTMLInputElement;
    const locationInput = getByTestId('location-input') as HTMLInputElement;
    const dateInput = getByPlaceholderText(
      'Data do meetup'
    ) as HTMLInputElement;
    const bannerInput = getByPlaceholderText(
      'Selecionar Imagem'
    ) as HTMLInputElement;

    const editMeetup = {
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      location: faker.address.streetAddress(),
      date: '2019-10-17T20:00:00.000Z',
      banner_id: faker.random.number(),
    };

    fireEvent.change(titleInput, {
      target: { value: editMeetup.title },
    });

    fireEvent.change(descriptionInput, {
      target: { value: editMeetup.description },
    });

    fireEvent.change(locationInput, {
      target: { value: editMeetup.location },
    });

    fireEvent.change(dateInput, {
      target: {
        value: format(
          parseISO(editMeetup.date),
          "dd 'de' MMMM', às' HH'h'mm'm'",
          {
            locale: pt,
          }
        ),
      },
    });

    bannerInput.setAttribute('data-file', String(editMeetup.banner_id));

    apiMock.onPut(`meetups/${meetupId}/update`).reply(200);
    fireEvent.click(getByTestId('save-button'));

    await wait(() => {});

    expect(history.location.pathname).toBe(`/meetup/${meetupId}`);

    expect(titleInput.value).toStrictEqual(editMeetup.title);
    expect(descriptionInput.value).toStrictEqual(editMeetup.description);
    expect(locationInput.value).toStrictEqual(editMeetup.location);
    expect(bannerInput.getAttribute('data-file')).toEqual(
      String(editMeetup.banner_id)
    );
    expect(dateInput.value).toStrictEqual(
      format(parseISO(editMeetup.date), "dd 'de' MMMM', às' HH'h'mm'm'", {
        locale: pt,
      })
    );
  });

  it('Should error to change meetup info and save', async () => {
    toast.error = jest.fn();
    apiMock.onGet(`meetups/${meetupId}`).reply(200, response);
    const { getByTestId } = render(
      <Router history={history}>
        <EditMeetup match={match} location={location} history={history} />
      </Router>
    );
    await wait(() => {});

    apiMock.onPut(`meetups/${meetupId}/update`).reply(500);
    fireEvent.click(getByTestId('save-button'));

    await wait(() => {});
    expect(toast.error).toHaveBeenCalled();
  });

  it('Should save a new meetup', async () => {
    const match2: any = { params: undefined };
    const { getByTestId, getByPlaceholderText } = render(
      <Router history={history}>
        <EditMeetup match={match2} location={location} history={history} />
      </Router>
    );

    await wait(() => {});

    const titleInput = getByTestId('title-input') as HTMLInputElement;
    const descriptionInput = getByTestId(
      'description-input'
    ) as HTMLInputElement;
    const locationInput = getByTestId('location-input') as HTMLInputElement;
    const dateInput = getByPlaceholderText(
      'Data do meetup'
    ) as HTMLInputElement;
    const bannerInput = getByPlaceholderText(
      'Selecionar Imagem'
    ) as HTMLInputElement;

    const editMeetup = {
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      location: faker.address.streetAddress(),
      date: '2019-10-17T20:00:00.000Z',
      banner_id: faker.random.number(),
    };

    fireEvent.change(titleInput, {
      target: { value: editMeetup.title },
    });

    fireEvent.change(descriptionInput, {
      target: { value: editMeetup.description },
    });

    fireEvent.change(locationInput, {
      target: { value: editMeetup.location },
    });

    fireEvent.change(dateInput, {
      target: {
        value: format(
          parseISO(editMeetup.date),
          "dd 'de' MMMM', às' HH'h'mm'm'",
          {
            locale: pt,
          }
        ),
      },
    });

    bannerInput.setAttribute('data-file', String(editMeetup.banner_id));

    apiMock.onPost(`meetups`).reply(200);
    fireEvent.click(getByTestId('save-button'));

    await wait(() => {});

    expect(history.location.pathname).toBe(`/`);
    expect(titleInput.value).toStrictEqual(editMeetup.title);
    expect(descriptionInput.value).toStrictEqual(editMeetup.description);
    expect(locationInput.value).toStrictEqual(editMeetup.location);
    expect(bannerInput.getAttribute('data-file')).toEqual(
      String(editMeetup.banner_id)
    );
    expect(dateInput.value).toStrictEqual(
      format(parseISO(editMeetup.date), "dd 'de' MMMM', às' HH'h'mm'm'", {
        locale: pt,
      })
    );
  });

  it('Should error a save new meetup', async () => {
    const match2: any = { params: undefined };
    const { getByPlaceholderText, getByTestId } = render(
      <Router history={history}>
        <EditMeetup match={match2} location={location} history={history} />
      </Router>
    );
    await wait(() => {});
    const titleInput = getByTestId('title-input') as HTMLInputElement;
    const descriptionInput = getByTestId(
      'description-input'
    ) as HTMLInputElement;
    const locationInput = getByTestId('location-input') as HTMLInputElement;
    const dateInput = getByPlaceholderText(
      'Data do meetup'
    ) as HTMLInputElement;
    const bannerInput = getByPlaceholderText(
      'Selecionar Imagem'
    ) as HTMLInputElement;

    const editMeetup = {
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      location: faker.address.streetAddress(),
      date: '2019-10-17T20:00:00.000Z',
      banner_id: faker.random.number(),
    };

    fireEvent.change(titleInput, {
      target: { value: editMeetup.title },
    });

    fireEvent.change(descriptionInput, {
      target: { value: editMeetup.description },
    });

    fireEvent.change(locationInput, {
      target: { value: editMeetup.location },
    });

    fireEvent.change(dateInput, {
      target: {
        value: format(
          parseISO(editMeetup.date),
          "dd 'de' MMMM', às' HH'h'mm'm'",
          {
            locale: pt,
          }
        ),
      },
    });

    bannerInput.setAttribute('data-file', String(editMeetup.banner_id));

    apiMock.onPost(`meetups`).reply(500);
    fireEvent.click(getByTestId('save-button'));

    await wait(() => {});

    expect(toast.error).toHaveBeenCalled();
  });
});
