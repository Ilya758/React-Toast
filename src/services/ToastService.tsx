import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ToastContainer } from '../components/ToastContainer';
import { TGeneratedToast, ToastConfig } from '../models/toast';
import { v4 as uuid } from 'uuid';
import { ANIM_DELAY } from '../constants/animDelay';
import { getCurrentToastWithParams } from '../utils/getToastParams';
import { IToastContainerProps } from '../components/ToastContainer/model';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

export default class ToastService {
  // TODO: add private field
  static instance: ToastService;

  toasts!: TGeneratedToast[];

  private container!: HTMLDivElement;

  private toastifyRoot!: Root;

  timerMap = new Map<string, { timer: NodeJS.Timeout }>();

  private _toastContainerConfig!: IToastContainerProps;

  get toastContainerConfig(): IToastContainerProps {
    return this._toastContainerConfig;
  }

  setToastContainerConfig = (config: IToastContainerProps) => {
    this._toastContainerConfig = config;
  };

  createRoot = (): void => {
    const element = document.createElement('div');

    element.setAttribute('id', 'toastify-root');

    this.container = element;

    this.toastifyRoot = createRoot(this.container);

    document.body.appendChild(this.container);
  };

  constructor() {
    if (typeof ToastService.instance === 'object') return ToastService.instance;

    this.toasts = [];

    ToastService.instance = this;

    this.createRoot();

    return this;
  }

  generateToast = (toastConfig?: ToastConfig): void => {
    const id = uuid();

    this.toasts.push({
      ...toastConfig,
      id,
      toasts: this.toasts,
      phase: 'appear',
      changeAnimCb: this.changeAnimationPhaseForToastById,
      dequeueCb: this.dequeueTimer,
      lifetime: toastConfig?.lifetime as number,
    });

    this.renderWithConfig(this.toastContainerConfig);
  };

  queueTimer = (id: string, lifetime: number): void => {
    const timerTimeout = setTimeout(() => {
      this.dequeueTimer(id);
    }, lifetime + ANIM_DELAY);

    this.timerMap.set(`${id}`, { timer: timerTimeout });
  };

  changeAnimationPhaseForToastById = (
    id: string,
    toastPhase: string,
    lifetime: number
  ) => {
    const { currentToast } = getCurrentToastWithParams(this.toasts, id);

    if (!currentToast) return;

    switch (toastPhase) {
      case 'appear': {
        currentToast.phase = 'visible';

        this.queueTimer(id, lifetime);

        break;
      }

      case 'visible': {
        currentToast.phase = 'disappear';

        break;
      }

      case 'disappear': {
        this.dequeueTimer(id);

        break;
      }
    }

    this.renderWithConfig(this.toastContainerConfig);
  };

  dequeueTimer = (timerId: string, removedByClick = false) => {
    const { currentToast } = getCurrentToastWithParams(this.toasts, timerId);

    (currentToast as TGeneratedToast).phase = 'destroy';

    removedByClick && this.renderWithConfig(this.toastContainerConfig);

    setTimeout(() => {
      const timer = this.timerMap.get(timerId)?.timer as NodeJS.Timeout;

      clearTimeout(timer);

      this.timerMap.delete(timerId);

      this.removeToast(timerId);
    }, ANIM_DELAY);
  };

  removeToast = (id: string) => {
    this.toasts = this.toasts.filter(toast => toast.id !== id);

    this.renderWithConfig(this.toastContainerConfig);
  };

  renderWithConfig = (containerConfig: IToastContainerProps) =>
    this.renderRoot(containerConfig);

  renderRoot = (containerConfig?: ToastConfig): void => {
    this.toastifyRoot.render(
      <ErrorBoundary>
        <ToastContainer {...containerConfig} />
      </ErrorBoundary>
    );
  };
}
