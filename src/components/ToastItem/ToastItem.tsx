import React from 'react';
import { IStyledProps } from '../../models/global';

export const ToastItem = ({ className, content }: IStyledProps) => {
  return (
    <li className={className}>
      <div className="toast-top__info">
        <span className="icon-success"></span>
        <p className="toast__text"> {content} </p>
        <button className="button-close"></button>
      </div>

      <div className="progressbar"></div>
    </li>
  );
};
