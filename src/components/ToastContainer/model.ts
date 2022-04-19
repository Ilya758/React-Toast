import { ToastConfig } from '../../models/toast';

export interface IToastContainerProps
  extends Omit<
    Partial<ToastConfig>,
    'backColor' | 'type' | 'containerRef' | 'icon'
  > {
  position: IListPosition;
}

export interface IToastList {
  position: IListPosition;
}

export interface IListPosition {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export type TContainerRef = {
  [id: string]: HTMLLIElement;
};
