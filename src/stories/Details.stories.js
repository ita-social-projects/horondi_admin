import React from 'react';

import Detail from '../components/detail/detail';

export default {
  title: 'Detail',
  component: Detail
};

const Template = (args) => <Detail {...args} />;

export const Standart = Template.bind({});
Standart.args = {
  title: 'Product',
  text: 'some text'
};
