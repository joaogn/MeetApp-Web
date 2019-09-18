import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline } from 'react-icons/md';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from 'services/api';

import { Container, Header, MeetupsList, Meetup } from './styles';

interface Meetup {
  id: number;
  title: string;
  date: string;
  formatedDate?: string;
}

export default function SingIn() {
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/meetups');
      const data: Meetup[] = response.data.map((item: Meetup) => {
        return {
          id: item.id,
          title: item.title,
          formatedDate: format(
            parseISO(item.date),
            "dd 'de' MMMM', às' HH'h' ",
            { locale: pt }
          ),
        };
      });
      setMeetups(data);
    }
    loadMeetups();
  }, []);
  return (
    <Container>
      <Header>
        <strong>Meus Meetups</strong>
        <button type="button">
          <MdAddCircleOutline />
          Novo Meetup
        </button>
      </Header>
      <MeetupsList>
        {meetups.map(meetup => (
          <Link to={`/meetup/${encodeURIComponent(meetup.id)}`}>
            <Meetup>
              <strong>{meetup.title}</strong>
              <p>{meetup.formatedDate}</p>
            </Meetup>
          </Link>
        ))}
      </MeetupsList>
    </Container>
  );
}
