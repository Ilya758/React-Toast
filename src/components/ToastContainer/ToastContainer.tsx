import React from 'react';
import { ToastStyledItem } from '../ToastItem/ToastItem.styles';
import { ToastList } from './ToastContainer.styles';
import ToastService from '../../services/ToastService';
import { IListPosition, IToastContainerProps } from './model';
import { INIT_LIFECYCLE_TIME } from '../../constants/initLifecycleTime';

export const ToastContainer = (props: IToastContainerProps) => {
  const toastService = new ToastService();

  const {
    toasts,
    changeAnimationPhaseForToastById,
    toastContainerConfig,
    setToastContainerConfig,
  } = toastService;

  setToastContainerConfig(props);

  const toastPredicate = toasts.length ? (
    <>
      <ToastList
        backColor={toastContainerConfig.backColor as string}
        position={toastContainerConfig.position as IListPosition}
      >
        {toasts.map(
          ({
            content,
            id,
            lifetime,
            phase,
            type,
            animationType,
            backColor,
            dequeueCb,
          }) => {
            const {
              lifetime: containerLifetime,
              animationType: containerAnimationType,
            } = toastContainerConfig;

            return (
              <ToastStyledItem
                className={type}
                toasts={toasts}
                key={id}
                id={id}
                type={type}
                phase={phase}
                backColor={backColor}
                content={content || props.content}
                lifetime={lifetime || (containerLifetime as number)}
                animationType={animationType || containerAnimationType}
                dequeueCb={dequeueCb}
                changeAnimCb={changeAnimationPhaseForToastById}
              />
            );
          }
        )}
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
};
