import React from 'react';
import { ToastStyledItem } from '../ToastItem/ToastItem.styles';
import { ToastList } from './ToastContainer.styles';
import ToastService from '../../services/ToastService';
import { INIT_LIFECYCLE_TIME } from '../../constants/initLifecycleTime';

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

ToastContainer.defaultProps = {
  content: 'Success!',
  lifetime: INIT_LIFECYCLE_TIME,
  position: {
    top: '0.5rem',
    right: '1rem',
  },
  animationType: 'bounce',
  backColor: '',
};
