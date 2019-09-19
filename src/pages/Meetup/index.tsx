import React, { useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import {
  MdCreate,
  MdDeleteForever,
  MdInsertInvitation,
  MdRoom,
} from 'react-icons/md';
import api from 'services/api';

import { Container, Header, Banner, Description, Details } from './styles';

interface Meetup {
  title: string;
  description: string;
  location: string;
  date: string;
  formatedDate?: string;
  file: {
    url: string;
  };
}

type Props = RouteComponentProps<any>;

export default function Meetup({ match, history }: Props) {
  const meetupId = decodeURIComponent(match.params.meetupId);
  const [meetup, setMeetup] = useState<Meetup>({
    title: '',
    description: '',
    location: '',
    date: '',
    file: { url: '' },
  });
  useEffect(() => {
    async function getMeetup() {
      const response = await api.get(`/meetups/${meetupId}`);
      const {
        title,
        description,
        location,
        date,
        file,
      }: Meetup = response.data;
      const data = {
        title,
        description,
        location,
        date,
        file,
        formatedDate: format(parseISO(date), "dd 'de' MMMM', às' HH'h' ", {
          locale: pt,
        }),
      };
      setMeetup(data);
    }
    getMeetup();
  }, [meetupId]);
  async function handleDelete() {
    try {
      await api.delete(`/meetups/${meetupId}`);
      toast.success('Meetup Cancelado com sucesso');
      history.push('/dashboard');
    } catch (err) {
      toast.error('Não é possivel cancelar esse Meetup');
    }
  }
  return (
    <Container>
      <Header>
        <strong>{meetup.title}</strong>
        <div>
          <Link to={`/editmeetup/${meetupId}`}>
            <button className="edit" type="button">
              <MdCreate />
              Editar
            </button>
          </Link>

          <button className="cancel" type="button" onClick={handleDelete}>
            <MdDeleteForever />
            Cancelar
          </button>
        </div>
      </Header>

      <Banner>
        <img src={meetup.file.url} alt="Banner" />
      </Banner>

      <Description>
        <p>{meetup.description}</p>
      </Description>

      <Details>
        <div className="date">
          <MdInsertInvitation />
          <p>{meetup.formatedDate}</p>
        </div>
        <div className="address">
          <MdRoom />
          <p>{meetup.location}</p>
        </div>
      </Details>
    </Container>
  );
}
