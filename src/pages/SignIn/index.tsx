import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { signInRequest } from 'store/modules/auth/actions';
import logo from 'assets/logo.svg';
import { ApplicationState } from 'store';

interface User {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email valido')
    .required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SingIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state: ApplicationState) => state.auth.loading);

  function handleSubmit(data: any) {
    const { email, password }: User = data;
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="MeetApp" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          data-testid="email-input"
          name="email"
          type="email"
          placeholder="Seu e-mail"
        />
        <Input
          data-testid="password-input"
          name="password"
          type="password"
          placeholder="Sua senha"
        />

        <button data-testid="signin-submit" type="submit">
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
        <Link to="register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}
