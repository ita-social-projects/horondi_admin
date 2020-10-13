import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CheckboxOptions from './checkbox-options';
import { config, inputTypes } from '../../configs';

const mockCallBack = jest.fn((name) => ({ [name]: true }));
Enzyme.configure({ adapter: new Adapter() });
const options = [
  {
    id: 'handmade',
    dataCy: 'handmade',
    value: true,
    checked: true,
    color: 'primary',
    label: config.labels.pattern.handmade,
    handler: () => mockCallBack('handmade', true)
  },
  {
    id: 'available',
    dataCy: 'available',
    value: false,
    checked: false,
    color: 'primary',
    label: config.labels.pattern.available,
    handler: (e) => mockCallBack('available', true)
  }
];

describe('checkbox-options tests', () => {
  const component = mount(<CheckboxOptions options={options} />);
  console.log(component);
  it('should click', () => {
    expect(component).toMatchSnapshot();
    expect(mockCallBack.mock.calls.length).toBe(0);
    const checkbox = component.get({ type: 'checkbox' });
    console.log(checkbox);
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
