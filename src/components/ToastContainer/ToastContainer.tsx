import React, { useRef } from 'react';
import { ToastStyledItem } from '../ToastItem/ToastItem.styles';
import { ToastList } from './ToastContainer.styles';
import ToastService from '../../services/ToastService';
import { IToastPosition, IToastContainerProps, TContainerRef } from './model';
import { INIT_LIFECYCLE_TIME } from '../../constants/initLifecycleTime';

export const ToastContainer = (props: IToastContainerProps) => {
  const toastService = new ToastService();

  const { toasts, toastContainerConfig, setToastContainerConfig } =
    toastService;

  setToastContainerConfig(props);

  const containerRef = useRef<TContainerRef>({});

  const setContainerRef = (id: string) => (ref: HTMLLIElement) =>
    (containerRef.current[id] = ref);

  const toastPredicate = toasts.length ? (
    <>
      <ToastList position={toastContainerConfig.position as IToastPosition}>
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
            icon,
            position,
          }) => {
            const {
              lifetime: containerLifetime,
              animationType: containerAnimationType,
            } = toastContainerConfig;

            return (
              <ToastStyledItem
                ref={setContainerRef(id)}
                containerRef={containerRef}
                className={type}
                key={id}
                id={id}
                position={position}
                type={type}
                phase={phase}
                backColor={backColor}
                content={content || props.content}
                lifetime={lifetime || (containerLifetime as number)}
                animationType={animationType || containerAnimationType}
                dequeueCb={dequeueCb}
                icon={icon}
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
