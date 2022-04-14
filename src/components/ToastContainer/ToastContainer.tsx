import React from 'react';
import { ToastStyledItem } from '../ToastItem/ToastItem.styles';
import { ToastList } from './ToastContainer.styles';
import ToastService from '../../services/ToastService';

export const ToastContainer = () => {
  const { toasts, changeAnimationPhaseForToastById } = new ToastService();

  const toastPredicate = toasts.length ? (
    <>
      <ToastList>
        {toasts.map(({ content, id, lifetime, phase, dequeueCb }) => {
          return (
            <ToastStyledItem
              toasts={toasts}
              key={id}
              id={id}
              phase={phase}
              content={content}
              dequeueCb={dequeueCb}
              lifetime={lifetime}
              changeAnimCb={changeAnimationPhaseForToastById}
            />
          );
        })}
      </ToastList>
    </>
  ) : null;

  return toastPredicate;
};
