import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';

import { updateProfileRequest } from 'store/modules/user/actions';
import { ApplicationState } from 'store';

import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email valido')
    .required('O email é obrigatório'),
  oldPassword: Yup.string(),
  password: Yup.string(),
  confirmPassword: Yup.string(),
});

export default function Profile() {
  const dispach = useDispatch();
  const profile = useSelector((state: ApplicationState) => state.user.profile);

  function handleSubmit(data: any) {
    console.tron.log(data);
    dispach(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu endereço de email" />
        <hr />
        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Sua nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
        />
        <button type="submit">
          <MdAddCircleOutline />
          Atualizar perfil
        </button>
      </Form>
    </Container>
  );
}
