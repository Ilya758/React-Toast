import { ToastConfig } from '../../models/toast';

export interface IToastContainerProps extends Partial<ToastConfig> {
  position: IListPosition;
}

export interface IToastList {
  position: IListPosition;
  backColor: string;
}

export interface IListPosition {
  top: string;
  right: string;
}
