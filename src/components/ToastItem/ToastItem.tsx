import React from 'react';
import { IStyledProps } from '../../models/global';
import { Progressbar } from './ToastItem.styles';

export const ToastItem = ({
  className,
  content,
  id,
  dequeueCb,
  lifetime,
}: IStyledProps) => {
  const dequeue = (id: string) => () => dequeueCb(id);

  return (
    <li onClick={dequeue(id)} className={className}>
      <div className="toast-top__info">
        <span className="icon-success"></span>
        <p className="toast__text"> {content} </p>
        <button className="button-close"></button>
      </div>

      <Progressbar lifetime={lifetime} />
    </li>
  );
};
