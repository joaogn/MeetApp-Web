import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from 'store';

import logo from 'assets/logo.svg';
import { signOut } from 'store/modules/auth/actions';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state: ApplicationState) => state.user);
  return (
    <Container>
      <Content data-testid="header-content">
        <nav>
          <Link to="/dashboard" data-testid="logo-button">
            <img src={logo} alt="MeetApp" />
          </Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <button
              data-testid="exit-button"
              type="button"
              onClick={() => dispatch(signOut())}
            >
              Sair
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
