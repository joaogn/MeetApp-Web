import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline } from 'react-icons/md';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from 'services/api';

import { Container } from './styles';

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
      <div className="header">
        <strong>Meus Meetups</strong>
        <Link to="/editmeetup">
          <button type="button">
            <MdAddCircleOutline />
            Novo Meetup
          </button>
        </Link>
      </div>
      <ul>
        {meetups.length === 0 ? (
          <>
            <strong>Não existe meetup cadastrado, crie um novo meetup</strong>
          </>
        ) : (
          <>
            {meetups.map(meetup => (
              <Link
                to={`/meetup/${encodeURIComponent(meetup.id)}`}
                key={meetup.id}
              >
                <li>
                  <strong>{meetup.title}</strong>
                  <p>{meetup.formatedDate}</p>
                </li>
              </Link>
            ))}
          </>
        )}
      </ul>
    </Container>
  );
}
