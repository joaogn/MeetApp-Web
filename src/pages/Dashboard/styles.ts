import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 940px;
  margin: auto;

  .header {
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 60px;

    strong {
      font-size: 20px;
      color: #fff;
    }

    button {
      align-self: flex-end;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f94d6a;
      border: 0;
      border-radius: 4px;
      height: 42px;
      width: 172px;
      color: #fff;
      margin: 5px 0 0;
      font-size: 16px;
      font-weight: bold;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#f94d6a')};
      }
      svg {
        margin-right: 10px;
      }
    }
  }

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    strong {
      font-size: 20px;
      margin: 25vh auto;
      color: #fff;
    }
  }

  li {
    margin: auto;
    width: 100%;
    height: 62px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
    margin-bottom: 5px;
    border-radius: 4px;
    cursor: pointer;

    strong {
      color: #fff;
      margin-left: 20px;
      font-size: 18px;
      line-height: 21px;
    }

    p {
      color: #fff;
      margin-right: 80px;
      font-size: 16px;
      line-height: 19px;
    }
  }

  @media only screen and (max-width: 940px) {
    .header {
      padding: 0 20px;
    }
    ul {
      padding: 0 20px;
    }
  }

  @media only screen and (max-width: 600px) {
    li {
      strong {
        font-size: 16px;
        line-height: 18px;
      }

      p {
        font-size: 14px;
        line-height: 18px;
      }
    }
  }

  @media only screen and (max-width: 450px) {
    .header {
      strong {
        font-size: 15px;
      }

      button {
        font-size: 12px;
        height: 42px;
        width: 120px;
      }
    }
    li {
      strong {
        margin-right: 40px;
        font-size: 14px;
        line-height: 16px;
      }

      p {
        color: #fff;
        margin-right: 10px;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
`;
