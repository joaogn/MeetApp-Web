import React from 'react';
import { RouteProps } from 'react-router-dom';

import { Wrapper, Content } from './styles';

export default function auth({ children }: RouteProps) {
  return (
    <Wrapper data-testid="auth-layout">
      <Content>{children}</Content>
    </Wrapper>
  );
}
