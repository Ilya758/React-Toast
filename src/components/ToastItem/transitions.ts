import { keyframes } from 'styled-components';

const shrink = (percents: number) => keyframes`
  0% {
    width: ${percents}%
  }

  100% {
    width: 0%
  }
`;

const topSlide = () => keyframes`
  100% {
    transform: translate(0, -4.5rem)
  }

  0% {
    transform: translate(0)
  }
`;

const bounce = () => keyframes`
  0% {
    transform: translate(120%, 0)
  }

  70% {
    transform: translate(-5%, 0) rotate(2deg)
  }

  85% {
    transform: translate(10%, 0) rotate(0deg)
  }

  100% {
    transform: translate(0%, 0)
  }
`;

const transformation = 'transform: translate(150%, 0)';

export const TRANSITIONS = {
  progressbar: {
    shrink,
  },
  list: {
    topSlide,
  },
  toast: {
    bounce: {
      onEnter: bounce,
      onExit: () => transformation,
    },
  },
};
