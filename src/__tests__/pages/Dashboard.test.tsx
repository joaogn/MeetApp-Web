import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dashboard from 'pages/Dashboard';
import { Router } from 'react-router-dom';
import history from 'services/history';
import api from 'services/api';

const apiMock = new MockAdapter(api);

describe('Dashboard page', () => {
  it('Should load meetups', async () => {
    const response = [
      {
        id: faker.random.number(),
        title: faker.lorem.words(),
        date: '2019-11-11T20:00:00.000Z',
      },
      {
        id: faker.random.number(),
        title: faker.lorem.words(),
        date: '2019-11-12T22:00:00.000Z',
      },
    ];
    apiMock.onGet('meetups').reply(200, response);

    const { queryByText } = render(
      <Router history={history}>
        <Dashboard />
      </Router>
    );

    await wait(() => {});
    expect(queryByText(response[0].title)).toBeTruthy();
    expect(queryByText(response[1].title)).toBeTruthy();
    expect(
      queryByText(
        format(parseISO(response[0].date), "dd 'de' MMMM', às' HH'h'", {
          locale: pt,
        })
      )
    ).toBeTruthy();
    expect(
      queryByText(
        format(parseISO(response[1].date), "dd 'de' MMMM', às' HH'h'", {
          locale: pt,
        })
      )
    ).toBeTruthy();
  });

  it('Should load meetup page when click meetup ', async () => {
    const response = [
      {
        id: faker.random.number(),
        title: faker.lorem.words(),
        date: '2019-10-11T20:00:00.000Z',
      },
    ];
    apiMock.onGet('meetups').reply(200, response);

    const { getByText } = render(
      <Router history={history}>
        <Dashboard />
      </Router>
    );

    await wait(() => {});
    fireEvent.click(getByText(response[0].title));
    expect(history.location.pathname).toBe(`/meetup/${response[0].id}`);
  });

  it('Should load edit meetup page when click in new meetup ', async () => {
    const { getByTestId } = render(
      <Router history={history}>
        <Dashboard />
      </Router>
    );

    await wait(() => {});
    fireEvent.click(getByTestId('new-meetup'));
    expect(history.location.pathname).toBe(`/editmeetup`);
  });

  it('Should not have meetup message on response error', async () => {
    const { queryByText } = render(
      <Router history={history}>
        <Dashboard />
      </Router>
    );

    apiMock.onGet('meetups').reply(500);

    await wait(() => {});
    expect(
      queryByText('Não existe meetup cadastrado, crie um novo meetup')
    ).toBeTruthy();
  });
});
