import { css } from 'styled-components';
import { TGeneratedToast } from '../../models/toast';
import { calculateAnimationParams } from '../../utils/calculateAnimationParams';
import { getCurrentToastWithParams } from '../../utils/getCurrentToastWithParams';
import { TRANSITIONS } from './transitions';

const {
  list,
  progressbar: { shrink },
  toast: { bounce },
} = TRANSITIONS;

export const progressBarAnimation = (lifetime: number) => {
  const { percents, seconds } = calculateAnimationParams(lifetime);

  return css`
    ${seconds}s ${shrink(percents)};
  `;
};

export const toastAnimation = (
  phase: string,
  toasts: TGeneratedToast[],
  id: string
) => {
  let needToSlideToTop = false;

  const destroyingToastIndex = toasts.findIndex(
    toast => toast.phase === 'destroy'
  );

  if (destroyingToastIndex >= 0) {
    const currentToastIndex = getCurrentToastWithParams(toasts, id).index;

    if (currentToastIndex > destroyingToastIndex) {
      needToSlideToTop = true;
    }
  }

  switch (phase) {
    case 'appear': {
      return css`
        animation: 0.5s ${bounce.onEnter()};
      `;
    }

    case 'visible': {
      return css`
        ${() =>
          needToSlideToTop
            ? css`
                animation: 0.5s ${list.topSlide()};
              `
            : css`
                transition: 0.1s;
              `}
      `;
    }

    case 'disappear':
    case 'destroy': {
      return css`
        ${bounce.onExit()}
      `;
    }
  }
};
