import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 940px;
  margin: auto;
  padding: 0 30px;

  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;

    strong {
      font-size: 32px;
      color: #fff;
    }

    div {
      display: flex;

      .edit {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #4dbaf9;
        border: 0;
        border-radius: 4px;
        height: 42px;
        width: 116px;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        transition: background 0.2s;
        margin-right: 20px;
        &:hover {
          background: ${darken(0.03, '#4DBAF9')};
        }
        svg {
          margin-right: 10px;
        }
      }

      .cancel {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #d44059;
        border: 0;
        border-radius: 4px;
        height: 42px;
        width: 138px;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        transition: background 0.2s;
        &:hover {
          background: ${darken(0.03, '#D44059')};
        }
        svg {
          margin-right: 10px;
        }
      }
    }
  }

  .banner {
    margin-top: 30px;
    img {
      width: 100%;
      height: 300px;
    }
  }

  .description {
    margin-top: 20px;
    width: 100%;
    color: #fff;
    font-size: 18px;
    line-height: 32px;
  }

  .details {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    margin-top: 30px;
    .date {
      display: flex;
      color: #fff;
      p {
        margin-left: 10px;
      }
    }
    .address {
      display: flex;
      color: #fff;
      margin-left: 60px;
      p {
        margin-left: 10px;
      }
    }
  }

  @media only screen and (max-width: 940px) {
    padding: 0 20px;
  }

  @media only screen and (max-width: 700px) {
    .header {
      strong {
        font-size: 24px;
      }
      div {
        .edit {
          width: 80px;
          font-size: 14px;
        }

        .cancel {
          width: 90px;
          font-size: 14px;
        }
      }
    }
  }

  @media only screen and (max-width: 540px) {
    .header {
      strong {
        font-size: 18px;
      }
    }
  }
`;
