import React from 'react';
import { RouteProps } from 'react-router-dom';

import Header from 'components/Header';

import { Wrapper } from './styles';

export default function auth({ children }: RouteProps) {
  return (
    <Wrapper data-testid="default-layout">
      <Header />
      {children}
    </Wrapper>
  );
}
