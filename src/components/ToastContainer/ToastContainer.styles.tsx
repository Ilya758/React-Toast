import styled, { css } from 'styled-components';
import { createToastStylesWithType } from '../../utils/createToastStylesWithType';
import { IToastList } from './model';

export const ToastList = styled.ul<IToastList>`
  position: absolute;

  ${({ position: { top, right, bottom, left } }) => {
    const positions = [{ top }, { right }, { bottom }, { left }];
    const anyPositionIsSet = !!positions.find(pos => pos);

    const mapPosition = css`
      ${() =>
        positions.map(pos => {
          const [key, prop] = Object.entries(pos)[0];

          if (prop) return `${key}: ${prop};`;
        })}
    `;

    const defaultPosition = css`
      top: 0.5rem;
      right: 1rem;
    `;

    return anyPositionIsSet ? mapPosition : defaultPosition;
  }}

  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 13rem;
  row-gap: 1rem;
  list-style-type: none;

  & li.success {
    & .toast__wrapper {
      ${() => createToastStylesWithType('success')}
    }
  }

  & li.error {
    & .toast__wrapper {
      ${() => createToastStylesWithType('error')}
    }
  }

  & li.warn {
    & .toast__wrapper {
      ${() => createToastStylesWithType('warn')}
    }
  }

  & li.info {
    & .toast__wrapper {
      ${() => createToastStylesWithType('info')}
    }
  }
`;
