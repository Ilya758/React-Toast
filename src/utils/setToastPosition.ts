import { css } from 'styled-components';
import { IToastPosition } from '../components/ToastContainer/model';

export const setToastPosition = (position: IToastPosition) => {
  const { bottom, left, right, top } = position;

  const positions = [{ top }, { right }, { bottom }, { left }];
  const anyPositionIsSet = !!positions.find(pos => pos);

  const mapPosition = css`
    position: absolute;

    ${() =>
      positions.map(pos => {
        const [key, prop] = Object.entries(pos)[0];

        if (prop) return `${key}: ${prop};`;
      })}
  `;

  const defaultPosition = css`
    position: absolute;
    top: 0.5rem;
    right: 1rem;
  `;

  return anyPositionIsSet ? mapPosition : defaultPosition;
};
