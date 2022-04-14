import React, { useEffect } from 'react';
import { ANIM_DELAY } from '../../constants/animDelay';
import { IStyledProps } from '../../models/global';
import { Progressbar } from './ToastItem.styles';

export const ToastItem = ({
  className,
  content,
  id,
  dequeueCb,
  lifetime,
  phase,
  changeAnimCb,
}: IStyledProps) => {
  const dequeue = (id: string) => () => dequeueCb(id, true);

  useEffect(() => {
    const changeToastPhase = (delay: number) =>
      setTimeout(() => changeAnimCb(id, phase), delay);

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
