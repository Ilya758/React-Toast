import React from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from '../components/ToastContainer';
import { ToastConfig } from '../models/toast';

export default class ToastService {
  static instance: ToastService;

  static createToastifyRoot = (): HTMLDivElement => {
    const element = document.createElement('div');
    element.setAttribute('id', 'toastify-root');
    return element;
  };

  private _toasts!: ToastConfig[];

  toastifyRoot = ToastService.createToastifyRoot();

  constructor() {
    if (typeof ToastService.instance === 'object') return ToastService.instance;

    this._toasts = [];

    ToastService.instance = this;

    return this;
  }

  get toasts() {
    return this._toasts;
  }

  getToastifyRoot = (): HTMLDivElement | null =>
    document.getElementById('toastify-root') as HTMLDivElement;

  generateToast = (toastConfig: ToastConfig): void => {
    this.getToastifyRoot() && this.unmountRoot();

    this.toasts.push({ ...toastConfig });

    this.toastifyRoot = ToastService.createToastifyRoot();

    document.body.appendChild(this.toastifyRoot);

    createRoot(this.toastifyRoot).render(
      <ToastContainer toasts={this.toasts} />
    );
  };

  unmountRoot = (): void => this.toastifyRoot.remove();
}
