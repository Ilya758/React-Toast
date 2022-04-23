import styled from 'styled-components';
import Form from './Form';

export const StyledForm = styled(Form)`
  & {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding-left: 2rem;
    max-width: 25rem;
    text-align: left;
    font-family: Roboto;
  }

  & .form {
    &__heading {
      font-size: 32px;
    }
  }

  & .row {
    display: flex;
    justify-content: center;

    & .col {
      & .s6 {
        margin-left: initial;
      }
    }
  }

  & .select {
    display: block;
  }

  & .span {
    &_margin {
      &_right {
        margin-right: 10px;
      }
    }
  }

  & .field {
    &__heading {
      font-weight: bold;
      width: 100%;
    }
  }

  & .error {
    color: red;
  }

  & .button {
    &_type {
      &_submit {
        font: 300 16px 'Roboto', sans-serif;
        border: none;
        border-radius: 3px;
        padding: 5px 12px;
        transition: 0.25s;

        &:disabled {
          background-color: #8080806e;
        }

        &:not(:disabled):hover {
          cursor: pointer;
          background-color: #26a69a;
        }

        &:not(:disabled):active {
          box-shadow: 0 0 10px -1px #26a69a;
          transform: translate(0, -5px);
        }
      }
    }
  }

  & input[type='checkbox'] {
    display: none;
  }

  & .input {
    padding-bottom: 5px;
    font: 300 16px Roboto, sans-serif;
    border: none;
    border-bottom: 1px solid #c4c4c485;
    transition: 0.25s;

    &__container {
      display: flex;
      flex-wrap: wrap;
    }

    &:focus {
      border: none;
      outline: none;
      border-bottom: 1px solid #00800085;
    }
  }

  & .checkbox {
    &_type {
      &_skills {
        & + span {
          cursor: pointer;
          transition: 0.25s;
          user-select: none;

          &:hover {
            text-shadow: 0 1px 2px #26a69a;
          }
        }

        &:checked + span {
          color: #26a69a;
          font-weight: bold;
        }
      }
    }
  }

  & .slider {
    display: flex;
    margin: 0 15px;
    align-items: center;
    width: 70px;
    height: 25px;
    border-radius: 20px;
    background-color: #949494;
    transition: 0.35s;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 10px -2px #26a69a;
    }

    &__input:checked + .slider {
      background-color: #84c7c1;

      & > .thumb {
        left: 42px;
        background-color: #26a69a;
      }
    }
  }

  & .thumb {
    position: relative;
    left: -2px;
    border-radius: 50%;
    display: block;
    background-color: #f1f1f1;
    height: 30px;
    width: 30px;
    transition: 0.35s;
  }

  & .cards {
    &__list {
      display: grid;
      margin-top: 15px;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }
  }
`;
