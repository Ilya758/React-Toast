import styled, { css } from 'styled-components';
import { createToastStylesWithType } from '../../utils/createToastStylesWithType';
import { IToastList } from './model';

export const ToastList = styled.ul<IToastList>`
  position: absolute;

  ${({ position: { top, right } }) => {
    return css`
      top: ${top};
      right: ${right};
    `;
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
    ${({ backColor }) => createToastStylesWithType('success', backColor)}
  }

  & li.error {
    ${({ backColor }) => createToastStylesWithType('error', backColor)}
  }

  & li.warn {
    ${({ backColor }) => createToastStylesWithType('warn', backColor)}
  }

  & li.info {
    ${({ backColor }) => createToastStylesWithType('info', backColor)}
  }
`;
