import { SetStateAction } from 'react';

export type ToastConfig = {
  content: string;
};

export interface IAdditionalProps extends TProgressbarParams {
  toasts: TGeneratedToast[];
  phase: string;
  id: string;
  dequeueCb: (timerId: string, removedByClick?: boolean) => void;
  changeAnimCb: (id: string, toastPhase: string) => void;
}

export type TSetToastsCb = (value: SetStateAction<TGeneratedToast[]>) => void;

export type TProgressbarParams = {
  lifetime: number;
};

export type TGeneratedToast = ToastConfig & IAdditionalProps;
