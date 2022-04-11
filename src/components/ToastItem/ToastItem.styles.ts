import styled from 'styled-components';
import { ToastItem } from './ToastItem';

import success from '@images/svg/icon-success.svg';
import iconClose from '@images/svg/icon-close.svg';
import { COLORS } from '../../constants/colors';

export const ToastStyledItem = styled(ToastItem)`
  position: relative;
  overflow: hidden;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  font: 400 0.7rem Roboto, sans-serif;
  border-radius: 0.5rem;
  background-color: ${COLORS.success};

  & .toast-top {
    &__info {
      display: flex;
      align-items: center;
      column-gap: 1.5rem;
    }
  }

  & .button-close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 0.8rem;
    height: 0.8rem;
    background: url(${iconClose}) center/cover no-repeat;
    outline: none;
    border: none;
  }

  & .icon-success {
    display: block;
    width: 1.8rem;
    height: 1.8rem;
    background: url(${success}) center/cover no-repeat;
  }

  & .toast {
    &__text {
      color: ${COLORS.light};
    }
  }

  & .progressbar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.2rem;
    background-color: ${COLORS.light};
  }
`;
