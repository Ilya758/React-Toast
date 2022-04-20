import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ToastStyledItem } from '../../components/ToastItem/ToastItem.styles';
import { ToastList } from '../../components/ToastContainer/ToastContainer.styles';

export default {
  title: 'React-Toastify/Toast',
  component: ToastStyledItem,
} as ComponentMeta<typeof ToastStyledItem>;

const Template: ComponentStory<
  typeof ToastStyledItem & typeof ToastList
> = args => <ToastStyledItem {...args} />;

export const Toast = Template.bind({});

Toast.args = {
  lifetime: 10000,
  animationType: 'rotate',
  id: '1',
  content: 'Custom Toast',
  type: 'success',
  phase: 'appear',
  icon: 'https://cdna.iconscout.com/production/img/black-search.3712edd.svg',
};
