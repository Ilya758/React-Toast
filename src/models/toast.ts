import { MutableRefObject } from 'react';
import {
  IToastPosition,
  TContainerRef,
} from '../components/ToastContainer/model';

export type ToastConfig = {
  content?: string;
  lifetime?: number;
  animationType?: TUnionAnimationType;
  backColor?: string;
  type?: TUnionToastType;
  containerRef?: MutableRefObject<TContainerRef>;
  icon?: string;
  position?: IToastPosition;
};

export type TUnionAnimationType = 'flip' | 'rotate' | 'bounce' | 'zoom';

export type TUnionToastType = 'success' | 'error' | 'warn' | 'info';

export type TUnionToastPhase = 'appear' | 'visible' | 'disappear' | 'destroy';

export interface IAdditionalProps extends TProgressbarParams {
  phase: TUnionToastPhase;
  id: string;
  dequeueCb: (timerId: string, removedByClick?: boolean) => void;
}

export type TProgressbarParams = {
  lifetime: number;
};

export type TGeneratedToast = ToastConfig & IAdditionalProps;
