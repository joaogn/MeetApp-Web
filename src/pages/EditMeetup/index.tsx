import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import format from 'date-fns/format';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import api from 'services/api';

import DatePicker from './DatePicker';

import BannerInput from './BannerInput';

import { Container } from './styles';

interface Meetup {
  title: string;
  description: string;
  location: string;
  date: string;
  file: {
    url: string;
  };
}

type Props = RouteComponentProps<any>;

const schema = Yup.object().shape({
  title: Yup.string().required('O Titulo é obrigatório'),
  description: Yup.string().required('A Descrição é obrigatória'),
  date: Yup.string().required('A Data é obrigatória'),
  banner_id: Yup.number(),
  location: Yup.string().required('A Localização é obrigatória'),
});

export default function EditMeetup({ match, history }: Props) {
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
      setMeetup(response.data);
    }
    if (Number(meetupId) > 0) {
      getMeetup();
    }
  }, [meetupId]);

  async function handleSubmit(data: any) {
    const newData = {
      ...data,
      date: format(new Date(data.date), "yyyy-MM-dd'T'HH:mm:ssxxx"),
    };
    if (Number(meetupId) > 0) {
      try {
        await api.put(`/meetups/${meetupId}/update`, newData);

        toast.success('Meetup atualizado com sucesso');
        history.push(`/meetup/${meetupId}`);
      } catch (err) {
        toast.error('Error ao atualizar o meetup');
      }
    } else {
      try {
        await api.post(`/meetups`, newData);
        toast.success('Meetup criado com sucesso');
        history.push('/');
      } catch (err) {
        toast.error('Error ao criar o meetup');
      }
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={meetup} onSubmit={handleSubmit}>
        <BannerInput name="banner_id" imageUrl={meetup.file.url} />
        <Input name="title" placeholder="Titulo do Meetup" />
        <Input name="description" multiline placeholder="Descrição completa" />

        <DatePicker name="date" initialDate={meetup.date} />

        <Input name="location" placeholder="Localização" />
        <div className="buttonContainer">
          <button type="submit">
            <MdAddCircleOutline />
            Salvar Meetup
          </button>
        </div>
      </Form>
    </Container>
  );
}
