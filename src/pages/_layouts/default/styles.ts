import styled from 'styled-components';
import ScrollBar from 'react-perfect-scrollbar';

export const Scroll = styled(ScrollBar)`
  height: calc(100% - 65px);
  padding: 5px 15px;
`;

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(180deg, #22202c 0%, #402845 100%);
`;
