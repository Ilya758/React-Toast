export type ToastConfig = {
  content: string;
};

export interface IAdditionalProps extends TProgressbarParams {
  id: string;
  dequeueCb: (timerId: string) => void;
}

export type TProgressbarParams = {
  lifetime: number;
};

export type TGeneratedToast = ToastConfig & IAdditionalProps;
