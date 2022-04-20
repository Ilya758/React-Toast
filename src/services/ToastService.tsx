import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ToastContainer } from '../components/ToastContainer';
import { TGeneratedToast, ToastConfig } from '../models/toast';
import { v4 as uuid } from 'uuid';
import { ANIM_DELAY } from '../constants/animDelay';
import { getCurrentToastWithParams } from '../utils/getToastParams';
import { IToastContainerProps } from '../components/ToastContainer/model';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { INIT_LIFECYCLE_TIME } from '../constants/initLifecycleTime';

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

  generateSuccessfulToast = (toastConfig?: ToastConfig) =>
    this.generateToast({
      ...toastConfig,
      type: 'success',
      content: toastConfig?.content || 'Success!',
    });

  generateErrorToast = (toastConfig?: ToastConfig) =>
    this.generateToast({
      ...toastConfig,
      type: 'error',
      content: toastConfig?.content || 'There is something happened!',
    });

  generateWarnToast = (toastConfig?: ToastConfig) =>
    this.generateToast({
      type: 'warn',
      content:
        toastConfig?.content || "Please be sure you've done right thing!",
      ...toastConfig,
    });

  generateInfoToast = (toastConfig?: ToastConfig) =>
    this.generateToast({
      type: 'info',
      content: toastConfig?.content || 'Some sort of information',
      ...toastConfig,
    });

  generateToast = (toastConfig?: ToastConfig): void => {
    const id = uuid();

    this.toasts.push({
      ...toastConfig,
      id,
      type: toastConfig?.type || 'success',
      phase: 'appear',
      dequeueCb: this.dequeueTimer,
      lifetime: toastConfig?.lifetime as number,
    });

    this.renderWithConfig(this.toastContainerConfig);

    this.changeAnimationPhaseForToastById(
      id,
      'appear',
      (toastConfig?.lifetime as number) || INIT_LIFECYCLE_TIME
    );
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

    const changeAnimation = () =>
      this.changeAnimationPhaseForToastById(id, currentToast.phase, lifetime);

    switch (toastPhase) {
      case 'appear': {
        setTimeout(() => {
          currentToast.phase = 'visible';

          changeAnimation();

          this.queueTimer(id, lifetime);
        }, ANIM_DELAY);
        break;
      }

      case 'visible': {
        setTimeout(() => {
          currentToast.phase = 'disappear';

          changeAnimation();
        }, lifetime);

        break;
      }

      case 'disappear': {
        currentToast.phase = 'destroy';

        this.dequeueTimer(id);
      }

      default:
        break;
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
