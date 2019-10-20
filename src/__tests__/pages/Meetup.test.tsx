import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import Meetup from 'pages/Meetup';
import { Router } from 'react-router-dom';
import history from 'services/history';
import api from 'services/api';

const apiMock = new MockAdapter(api);
const match: any = { params: { meetupId: 10 } };
const location: any = {};

const response = {
  past: false,
  title: faker.lorem.words(),
  description: faker.lorem.paragraph(),
  location: faker.address.streetAddress(),
  date: '2019-10-16T20:00:00.000Z',
  banner_id: 1,
  file: {
    path: `${faker.random.uuid}.jpg`,
    url: faker.image.nature(),
  },
};

beforeEach(() => {
  apiMock.onGet('meetups/10').reply(200, response);
});

describe('Meetup page', () => {
  it('Should load meetup info', async () => {
    const { queryByTestId, getByText, queryByText, getByTestId } = render(
      <Router history={history}>
        <Meetup match={match} location={location} history={history} />
      </Router>
    );
    await wait(() => {});
    const banner = getByTestId('meetup-banner') as HTMLImageElement;
    expect(banner.src).toBe(response.file.url);
    expect(queryByText(response.title)).toBeTruthy();
    expect(queryByText(response.location)).toBeTruthy();
    expect(
      getByText(
        format(parseISO(response.date), "dd 'de' MMMM', às' HH'h'", {
          locale: pt,
        })
      )
    ).toBeTruthy();
    expect(queryByTestId('edit-button')).toBeTruthy();
    expect(queryByTestId('cancel-button')).toBeTruthy();
  });

  it('Should if meetup its past not load edit and cancel meetup buttom', async () => {
    const pastResponse = {
      past: true,
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      location: faker.address.streetAddress(),
      date: '2019-10-16T20:00:00.000Z',
      banner_id: 1,
      file: {
        path: `${faker.random.uuid}.jpg`,
        url: faker.image.nature(),
      },
    };
    apiMock.onGet('meetups/10').reply(200, pastResponse);

    const { queryByTestId } = render(
      <Router history={history}>
        <Meetup match={match} location={location} history={history} />
      </Router>
    );
    await wait(() => {});
    expect(queryByTestId('edit-button')).toBeNull();
    expect(queryByTestId('cancel-button')).toBeNull();
  });

  it('Should error to cancel meetup in click cancel button', async () => {
    toast.error = jest.fn();
    apiMock.onDelete('meetups/10').reply(500);

    const { getByTestId } = render(
      <Router history={history}>
        <Meetup match={match} location={location} history={history} />
      </Router>
    );
    await wait(() => {});
    fireEvent.click(getByTestId('cancel-button'));
    await wait(() => {});
    expect(toast.error).toHaveBeenCalled();
  });

  it('Should cancel meetup in click cancel button', async () => {
    toast.success = jest.fn();
    apiMock.onDelete('meetups/10').reply(200);

    const { getByTestId } = render(
      <Router history={history}>
        <Meetup match={match} location={location} history={history} />
      </Router>
    );
    await wait(() => {});
    fireEvent.click(getByTestId('cancel-button'));
    await wait(() => {});
    expect(toast.success).toHaveBeenCalled();
    expect(history.location.pathname).toBe(`/dashboard`);
  });

  it('Should open edit meetup in click edit button', async () => {
    apiMock.onDelete('meetups/10').reply(200);

    const { getByTestId } = render(
      <Router history={history}>
        <Meetup match={match} location={location} history={history} />
      </Router>
    );
    await wait(() => {});
    fireEvent.click(getByTestId('edit-button'));
    await wait(() => {});
    expect(history.location.pathname).toBe(`/editmeetup/10`);
  });
});
