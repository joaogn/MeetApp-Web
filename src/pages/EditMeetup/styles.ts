import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: auto;
  form {
    display: flex;
    flex-direction: column;
    padding-top: 60px;
  }
  textarea {
    background: rgba(0, 0, 0, 0.1);
    height: 200px;
    resize: none;
    border: 0;
    border-radius: 4px;
    color: #fff;
    margin: 0 0 10px;
    padding-top: 15px;
    padding-left: 15px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }
  input {
    background: rgba(0, 0, 0, 0.1);
    border: 0;
    border-radius: 4px;
    height: 44px;
    padding: 0 15px;
    color: #fff;
    margin: 0 0 10px;
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }
  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }
  hr {
    border: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    margin: 10px 0 20px;
  }

  .buttonContainer {
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: flex-end;
      margin-top: 10px;
      width: 180px;
      background: #f64c75;
      border: 0;
      border-radius: 4px;
      height: 42px;
      color: #fff;
      margin: 5px 0 0;
      font-size: 16px;
      font-weight: bold;
      line-height: 19px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.08, '#f64c75')};
      }
      svg {
        margin-right: 10px;
      }
    }
  }

  @media only screen and (max-width: 940px) {
    padding: 0 20px;
  }
`;
