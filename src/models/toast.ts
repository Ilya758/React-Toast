import { MutableRefObject, SetStateAction } from 'react';
import { TContainerRef } from '../components/ToastContainer/model';

export type ToastConfig = {
  content?: string;
  lifetime?: number;
  animationType?: TUnionAnimationType;
  backColor?: string;
  type?: string;
  containerRef?: MutableRefObject<TContainerRef>;
  icon?: string;
};

export type TUnionAnimationType = 'flip' | 'rotate' | 'bounce' | 'zoom';

export interface IAdditionalProps extends TProgressbarParams {
  toasts: TGeneratedToast[];
  phase: string;
  id: string;
  dequeueCb: (timerId: string, removedByClick?: boolean) => void;
  changeAnimCb: (id: string, toastPhase: string, lifetime: number) => void;
}

export type TSetToastsCb = (value: SetStateAction<TGeneratedToast[]>) => void;

export type TProgressbarParams = {
  lifetime: number;
};

export type TGeneratedToast = ToastConfig & IAdditionalProps;
