import styled from 'styled-components';
import { setToastPosition } from '../../utils/setToastPosition';
import { TToastList } from './model';

export const ToastList = styled.ul<TToastList>`
  ${({ position }) => {
    return setToastPosition(position);
  }}

  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 13rem;
  row-gap: 1rem;
  list-style-type: none;
`;
