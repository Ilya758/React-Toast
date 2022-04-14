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
    transform: translate(120%, 0);
    opacity: 0;
  }

  50% {
    transform: translate(-5%, 0);
    opacity: 0.8
  }

  75% {
    transform: translate(5%, 0);
    opacity: 0.8
  }

  100% {
    transform: translate(0%, 0);
    opacity: 1;
  }
`;

const zoom = () => keyframes`
  0% {
    transform: scale(0) rotateZ(-10deg);
    opacity: 0;
  }

  100% {
    transform: scale(1) rotateZ(0deg);
    opacity: 1;
  }
`;

const flip = () => keyframes`
  0% {
    transform: rotateX(40deg);
    opacity: 0;
  }

  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
`;

const rotate = () => keyframes`
  0% {
    transform: rotateZ(90deg) translate(25%, -25%);
    opacity: 0;
  }

  100% {
    transform: rotateZ(0deg) translate(0) ;
    opacity: 1;
  }
`;

export const TRANSITIONS = {
  progressbar: {
    shrink,
  },
  list: {
    topSlide,
  },
  toast: {
    bounce,
    flip,
    zoom,
    rotate,
  },
};
