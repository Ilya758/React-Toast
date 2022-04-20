import { ToastConfig } from '../../models/toast';

export interface IToastContainerProps
  extends Omit<
    Partial<ToastConfig>,
    'backColor' | 'type' | 'containerRef' | 'icon'
  > {
  position: IToastPosition;
}

export type TToastList = Pick<IToastContainerProps, 'position'>;

export interface IToastPosition {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export type TContainerRef = {
  [id: string]: HTMLLIElement;
};
