import React, { forwardRef, LegacyRef, useEffect } from 'react';
import { ANIM_DELAY } from '../../constants/animDelay';
import { IStyledProps } from '../../models/global';
import { Progressbar } from './ToastItem.styles';

export const ToastItem = forwardRef(
  (
    {
      className,
      content,
      id,
      dequeueCb,
      lifetime,
      phase,
      changeAnimCb,
      type,
      backColor,
    }: IStyledProps,
    ref: LegacyRef<HTMLLIElement>
  ) => {
    const dequeue = (id: string) => () => dequeueCb(id, true);

    useEffect(() => {
      const changeToastPhase = (delay: number) =>
        setTimeout(() => changeAnimCb(id, phase, lifetime), delay);

      switch (phase) {
        case 'appear': {
          changeToastPhase(ANIM_DELAY);

          break;
        }

        case 'visible': {
          changeToastPhase(lifetime);

          break;
        }

        case 'disappear':
        case 'destroy': {
          changeToastPhase(ANIM_DELAY);
        }
      }
    }, [phase, id, changeAnimCb, lifetime]);

    return (
      <li ref={ref} className={className} onClick={dequeue(id)}>
        <div className="toast__wrapper" style={{ backgroundColor: backColor }}>
          <div className="toast-top__info">
            <span className={`icon icon-${type}`}></span>
            <p className="toast__text"> {content} </p>
            <button className="button-close"></button>
          </div>

          <Progressbar lifetime={lifetime} />
        </div>
      </li>
    );
  }
);
