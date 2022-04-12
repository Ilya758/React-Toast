import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ToastContainer } from '../components/ToastContainer';
import { TGeneratedToast, ToastConfig } from '../models/toast';
import { v4 as uuid } from 'uuid';

export default class ToastService {
  static instance: ToastService;

  toasts!: TGeneratedToast[];

  private container!: HTMLDivElement;

  private toastifyRoot!: Root;

  timerMap = new Map<string, { timer: NodeJS.Timeout }>();

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

  generateToast = (toastConfig: ToastConfig): void => {
    const id = uuid();

    this.toasts.push({
      ...toastConfig,
      id,
      dequeueCb: this.dequeueTimer,
      lifetime: 5000,
    });

    this.renderRoot();

    this.queueTimer(id);
  };

  queueTimer = (id: string): void => {
    const timerTimeout = setTimeout(() => {
      this.dequeueTimer(id);
    }, 5000);

    this.timerMap.set(`${id}`, { timer: timerTimeout });
  };

  dequeueTimer = (timerId: string) => {
    const timer = this.timerMap.get(timerId)?.timer as NodeJS.Timeout;

    clearTimeout(timer);

    this.timerMap.delete(timerId);

    this.removeToast(timerId);
  };

  removeToast = (id: string) => {
    this.toasts = this.toasts.filter(toast => toast.id !== id);

    this.renderRoot();
  };

  renderRoot = (): void => {
    this.toastifyRoot.render(<ToastContainer />);
  };
}
