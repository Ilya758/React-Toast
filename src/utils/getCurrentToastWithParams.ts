import { TGeneratedToast } from '../models/toast';

export const getCurrentToastWithParams = (
  toasts: TGeneratedToast[],
  id: string
) => {
  const predicate = (toast: TGeneratedToast) => toast.id === id;

  return {
    index: toasts.findIndex(predicate),
    currentToast: toasts.find(predicate),
  };
};
