import React from 'react';

import BackButton from '../components/buttons/back-button';

export default {
  title: 'BackButton',
  component: BackButton,
  argTypes: { onClick: { action: 'clicked' } }
};

const Template = (args) => <BackButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  type: 'button',
  variant: 'contained'
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  type: 'button',
  variant: 'contained'
};

export const Large = Template.bind({});
Large.args = {
  color: 'primary',
  type: 'button',
  variant: 'contained',
  size: 'large'
};
