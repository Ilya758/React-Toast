import styled from 'styled-components';
import { ToastItem } from './ToastItem';
import { COLORS } from '../../constants/colors';
import { TProgressbarParams } from '../../models/toast';
import { ANIM_DELAY } from '../../constants/animDelay';
import { progressBarAnimation, toastAnimation } from './transitionHelpers';

export const ToastStyledItem = styled(ToastItem)`
  position: relative;
  overflow: hidden;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  font: 400 0.7rem Roboto, sans-serif;
  border-radius: 0.5rem;

  ${({ phase, toasts, id }) => toastAnimation(phase, toasts, id)};

  cursor: pointer;
  transition: ${ANIM_DELAY}ms;

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
    outline: none;
    border: none;
    opacity: 0.6;
    transition: 0.2s;

    &:hover {
      opacity: 1;
      cursor: pointer;
    }
  }

  & .icon {
    display: block;
    width: 1.8rem;
    height: 1.8rem;
  }
`;

export const Progressbar = styled.div<TProgressbarParams>`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0%;
  height: 0.2rem;
  background-color: ${COLORS.light};
  animation: ${({ lifetime }) => progressBarAnimation(lifetime)};
`;
