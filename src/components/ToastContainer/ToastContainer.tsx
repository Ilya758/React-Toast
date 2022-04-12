import React from 'react';
import { ToastStyledItem } from '../ToastItem/ToastItem.styles';
import { ToastList } from './ToastContainer.styles';
import ToastService from '../../services/ToastService';

export const ToastContainer = () => {
  const { toasts, dequeueTimer } = new ToastService();

  const toastPredicate = toasts.length ? (
    <>
      <ToastList>
        {toasts.map(({ content, id, lifetime }) => {
          return (
            <ToastStyledItem
              id={id}
              key={id}
              content={content}
              dequeueCb={dequeueTimer}
              lifetime={lifetime}
            />
          );
        })}
      </ToastList>
    </>
  ) : null;

  return toastPredicate;
};
