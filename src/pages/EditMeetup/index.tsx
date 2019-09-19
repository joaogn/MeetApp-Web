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

export default function EditMeetup({ match, history }: Props) {
  const meetupId = decodeURIComponent(match.params.meetupId);
  const [description, setDescription] = useState('');
  const [meetup, setMeetup] = useState<Meetup>({
    title: '',
    description: '',
    location: '',
    date: '',
    file: { url: '' },
  });

  function createSchema() {
    if (Number(meetupId) > 0) {
      return Yup.object().shape({
        title: Yup.string(),
        description: Yup.string(),
        date: Yup.string(),
        banner_id: Yup.number(),
        location: Yup.string(),
      });
    }
    return Yup.object().shape({
      title: Yup.string().required('O Titulo é obrigatório'),
      description: Yup.string().required('A Descrição é obrigatória'),
      date: Yup.string()
        .required('A Data é obrigatória')
        .nullable(),
      banner_id: Yup.number().required('A Imagem é obrigatória'),
      location: Yup.string().required('A Localização é obrigatória'),
    });
  }

  useEffect(() => {
    async function getMeetup() {
      const response = await api.get(`/meetups/${meetupId}`);
      setMeetup(response.data);
      setDescription(response.data.description);
    }
    if (meetupId) {
      getMeetup();
    }
  }, [meetupId]);

  async function handleSubmit(data: any) {
    console.tron.log(data.date);
    console.tron.log();
    const newData = {
      ...data,
      date: format(new Date(data.date), "yyyy-MM-dd'T'HH:mm:ssxxx"),
    };
    console.tron.log(newData);
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
      <Form
        schema={createSchema()}
        initialData={meetup}
        onSubmit={handleSubmit}
      >
        <BannerInput name="banner_id" imageUrl={meetup.file.url} />
        <Input name="title" placeholder="Titulo do Meetup" />
        <Input
          name="description"
          multiline
          placeholder="Descrição completa"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

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
