import React from 'react';
import { IToastContainerProps } from './model';
import { v4 as uuid } from 'uuid';
import { ToastStyledItem } from '../ToastItem/ToastItem.styles';
import { ToastList } from './ToastContainer.styles';

export const ToastContainer = ({ toasts }: IToastContainerProps) => {
  const toastPredicate = toasts.length ? (
    <>
      <ToastList>
        {toasts.map(({ content }) => {
          return <ToastStyledItem key={uuid()} content={content} />;
        })}
      </ToastList>
    </>
  ) : null;

  return toastPredicate;
};
