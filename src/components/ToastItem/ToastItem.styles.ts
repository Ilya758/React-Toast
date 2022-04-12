import styled, { css, keyframes } from 'styled-components';
import { ToastItem } from './ToastItem';

import success from '@images/svg/icon-success.svg';
import iconClose from '@images/svg/icon-close.svg';
import { COLORS } from '../../constants/colors';
import { TProgressbarParams } from '../../models/toast';
import { calculateAnimationParams } from '../../utils/calculateAnimationParams';

const progressBarAnimation = (percents: number) => keyframes`
  0% {
    width: ${percents}%
  }

  100% {
    width: 0%
  }
`;

const toastAnimation = (lifetime: number) => {
  const { percents, seconds } = calculateAnimationParams(lifetime);

  return css`
    ${seconds}s ${progressBarAnimation(percents)};
  `;
};

export const ToastStyledItem = styled(ToastItem)`
  position: relative;
  overflow: hidden;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  font: 400 0.7rem Roboto, sans-serif;
  border-radius: 0.5rem;
  background-color: ${COLORS.success};
  cursor: pointer;

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
    background: url(${iconClose}) center/contain no-repeat;
    outline: none;
    border: none;
    opacity: 0.6;
    transition: 0.2s;

    &:hover {
      opacity: 1;
      cursor: pointer;
    }
  }

  & .icon-success {
    display: block;
    width: 1.8rem;
    height: 1.8rem;
    background: url(${success}) center/contain no-repeat;
  }

  & .toast {
    &__text {
      color: ${COLORS.light};
    }
  }
`;

export const Progressbar = styled.div<TProgressbarParams>`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0%;
  height: 0.2rem;
  background-color: ${COLORS.light};
  animation: ${({ lifetime }) => toastAnimation(lifetime)};
`;
