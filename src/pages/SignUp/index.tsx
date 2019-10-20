import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';
import { ApplicationState } from '../../store';

import { signUpRequest } from '../../store/modules/auth/actions';

interface User {
  name: string;
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatorio'),
  email: Yup.string()
    .email('Insira um email valido')
    .required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SingIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state: ApplicationState) => state.auth.loading);

  function handleSubmit(data: any) {
    const { name, email, password }: User = data;
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          data-testid="name-input"
          name="name"
          type="text"
          placeholder="Nome completo"
        />
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

        <button data-testid="signup-submit" type="submit">
          {loading ? 'Carregando...' : 'Criar Conta'}
        </button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
