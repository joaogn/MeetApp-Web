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
  password: Yup.string().when('oldPassword', (oldPassword: any, field: any) =>
    oldPassword ? field.min(6).required('A Senha é Obrigatoria') : field
  ),
  confirmPassword: Yup.string().when('password', (password: any, field: any) =>
    password
      ? field.oneOf([Yup.ref('password')], 'A senha confirmada está errada')
      : field
  ),
});

export default function Profile() {
  const dispach = useDispatch();
  const profile = useSelector((state: ApplicationState) => state.user.profile);

  function handleSubmit(data: any, { resetForm }: any) {
    dispach(updateProfileRequest(data));
    resetForm({ name: profile.name, email: profile.email });
  }

  return (
    <Container data-testid="profile-content">
      <Form initialData={profile} schema={schema} onSubmit={handleSubmit}>
        <Input
          data-testid="name-input"
          name="name"
          placeholder="Nome completo"
        />
        <Input
          data-testid="email-input"
          name="email"
          type="email"
          placeholder="Seu endereço de email"
        />
        <hr />
        <Input
          data-testid="oldpassword-input"
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input
          data-testid="password-input"
          name="password"
          type="password"
          placeholder="Sua nova senha"
        />
        <Input
          data-testid="confirmpassword-input"
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
        />
        <button data-testid="profile-submit" type="submit">
          <MdAddCircleOutline />
          Atualizar perfil
        </button>
      </Form>
    </Container>
  );
}
