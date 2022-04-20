import { MutableRefObject } from 'react';
import { css, Keyframes } from 'styled-components';
import ToastService from '../../services/ToastService';
import { calculateAnimationParams } from '../../utils/calculateAnimationParams';
import {
  getCurrentToastWithParams,
  getDestroyingToastParams,
} from '../../utils/getToastParams';
import { TContainerRef } from '../ToastContainer/model';
import { TRANSITIONS } from './transitions';

const {
  list,
  progressbar: { shrink },
  toast: { bounce, flip, zoom, rotate },
} = TRANSITIONS;

export const progressBarAnimation = (lifetime: number) => {
  const { percents, seconds } = calculateAnimationParams(lifetime);

  return css`
    ${seconds}s ${shrink(percents)};
  `;
};

const switchToastAnimation = (animationType: string) => {
  let animation = bounce;

  switch (animationType) {
    case 'zoom': {
      animation = zoom;
      break;
    }

    case 'flip': {
      animation = flip;
      break;
    }

    case 'rotate': {
      animation = rotate;
      break;
    }
  }

  return animation;
};

const getClientRectParams = (destroyingEl: HTMLLIElement) => {
  return destroyingEl.getBoundingClientRect().height;
};

const applyStyles = (
  phase: string,
  animation: () => Keyframes,
  needToSlideToTop: boolean,
  height: number
) => {
  switch (phase) {
    case 'appear': {
      return css`
        animation: 0.5s ${animation()};
      `;
    }

    case 'visible': {
      return css`
        ${() =>
          needToSlideToTop
            ? css`
                animation: 0.5s ${list.topSlide(height)};
              `
            : css`
                animation: none;
              `}
      `;
    }

    case 'disappear':
    case 'destroy': {
      return css`
        transform: translate(150%, 0);
        animation: 0.5s ${animation()} reverse;
        opacity: 0;
      `;
    }
  }
};

export const toastAnimation = (
  phase: string,
  id: string,
  animationType: string,
  containerRef: MutableRefObject<TContainerRef>
) => {
  const animation = switchToastAnimation(animationType);

  let needToSlideToTop = false;

  let height = 0;

  const { toasts } = new ToastService();

  const { id: destroyingElementId, index: destroyingToastIndex } =
    getDestroyingToastParams(toasts);

  if (destroyingToastIndex >= 0) {
    const currentToastIndex = getCurrentToastWithParams(toasts, id).index;

    if (currentToastIndex > destroyingToastIndex) {
      const destroyingEl = containerRef.current[
        destroyingElementId as keyof MutableRefObject<TContainerRef>
      ] as HTMLLIElement;

      height = getClientRectParams(destroyingEl);

      needToSlideToTop = true;
    }
  }

  return applyStyles(phase, animation, needToSlideToTop, height);
};
