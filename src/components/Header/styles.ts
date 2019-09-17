import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 0 30px;
`;
export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  nav {
    display: flex;
    align-items: center;
    img {
      margin-right: 20px;
      padding-right: 20px;
    }
  }
  aside {
    display: flex;
    align-items: center;
  }
`;
export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  div {
    text-align: right;
    margin-right: 10px;
    strong {
      display: block;
      font-size: 14px;
      line-height: 16px;
      color: #fff;
    }
    a {
      display: block;
      margin-top: 2px;
      font-size: 14px;
      line-height: 16px;
      color: #999;
    }
  }
  button {
    height: 42px;
    width: 71px;
    border: 0;
    border-radius: 4px;
    color: #fff;
    margin: 0 30px 0;
    font-size: 18px;
    background-color: #f94d6a;
    &:hover {
      background: ${darken(0.03, '#F94D6A')};
    }
  }
`;
