import React from 'react';
import { RouteProps } from 'react-router-dom';

import Header from 'components/Header';

import { Wrapper, Scroll } from './styles';

export default function auth({ children }: RouteProps) {
  return (
    <Wrapper>
      <Header />
      <Scroll>{children}</Scroll>
    </Wrapper>
  );
}
