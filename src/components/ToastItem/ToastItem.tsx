import React, { forwardRef, LegacyRef } from 'react';
import { IStyledProps } from '../../models/global';
import { useErrorBoundary } from '../../utils/hooks/useErrorBoundary';
import { Progressbar } from './ToastItem.styles';

export const ToastItem = forwardRef(
  (
    {
      className,
      content,
      id,
      dequeueCb,
      lifetime,
      type,
      backColor,
    }: IStyledProps,
    ref: LegacyRef<HTMLLIElement>
  ) => {
    const { triggerError } = useErrorBoundary();

    const dequeue = (id: string) => () => {
      try {
        dequeueCb(id, true);
      } catch (error) {
        triggerError(error as Error);
      }
    };

    return (
      <li ref={ref} className={className} onClick={dequeue(id)}>
        <div className="toast__wrapper" style={{ backgroundColor: backColor }}>
          <div className="toast-top__info">
            <span id="icon" className={`icon icon-${type}`}></span>
            <p className="toast__text"> {content} </p>
            <button className="button-close"></button>
          </div>

          <Progressbar lifetime={lifetime} />
        </div>
      </li>
    );
  }
);
