import success from '@images/svg/icon-success.svg';
import error from '@images/svg/icon-error.svg';
import warn from '@images/svg/icon-warn.svg';
import info from '@images/svg/icon-info.svg';
import iconClose from '@images/svg/icon-close.svg';
import { COLORS } from '../constants/colors';
import { css } from 'styled-components';

export const createToastStylesWithType = (
  toastType: string,
  backColor: string
) => {
  // TODO: fix a type of an importing icon
  let color = COLORS.light;

  let icon;

  switch (toastType) {
    case 'success': {
      icon = success;
      break;
    }

    case 'error': {
      icon = error;
      break;
    }

    case 'warn': {
      icon = warn;
      color = COLORS.dark;

      break;
    }

    case 'info': {
      icon = info;
      break;
    }
  }

  const bcgColor = COLORS[toastType as keyof typeof COLORS];

  return css`
    background-color: ${backColor ? backColor : bcgColor};

    & .icon.icon-${toastType} {
      background: url(${icon}) center/contain no-repeat;
    }

    & .toast {
      &__text {
        flex: 1;
        color: ${color};
        word-break: break-all;
      }
    }

    & .button-close {
      mask: url(${iconClose}) center/contain no-repeat;
      background-color: ${color};
    }
  `;
};
