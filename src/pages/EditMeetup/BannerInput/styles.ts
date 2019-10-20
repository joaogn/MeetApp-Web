import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;
  width: 100%;
  label {
    width: 100%;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 300px;
      width: 100%;
      background: rgba(0, 0, 0, 0.4);
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
      strong {
        margin-top: 10px;
        font-size: 20px;
        color: rgba(255, 255, 255, 0.3);
      }
    }
    img {
      height: 300px;
      width: 100%;
      border-radius: 4px;
      color: #fff;
      background: rgba(0, 0, 0, 0.3);
      border: 0;
    }
    input {
      display: none;
    }
  }
`;
