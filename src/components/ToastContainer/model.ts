import { ToastConfig } from '../../models/toast';

export interface IToastContainerProps
  extends Omit<Partial<ToastConfig>, 'backColor' | 'type' | 'containerRef'> {
  position: IListPosition;
}

export interface IToastList {
  position: IListPosition;
}

export interface IListPosition {
  top: string;
  right: string;
}

export type TContainerRef = {
  [id: string]: HTMLLIElement;
};
