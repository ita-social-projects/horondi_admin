import React from 'react';
import { mount } from 'enzyme';
import CheckboxOptions from './checkbox-options';
import { config } from '../../configs';

const mockCallBack = jest.fn((name) => ({ [name]: true }));

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

  it('test checkboxes attributes', () => {
    const checkbox = component.find('input[type="checkbox"]');

    expect(checkbox.length).toBe(2);
    expect(checkbox.at(0).props().checked).toEqual(true);
    expect(checkbox.at(0).props().checked).toBeDefined();
    expect(checkbox.at(0).props().checked).not.toBeNull();
    expect(checkbox.at(0).props().checked).toEqual(options[0].checked);
    expect(checkbox.at(0).props().value).toBeDefined();
    expect(checkbox.at(0).props().value).not.toBeNull();
    expect(checkbox.at(0).props().value).toEqual(options[0].checked);

    expect(checkbox.at(1).props().checked).toBeDefined();
    expect(checkbox.at(1).props().checked).not.toBeNull();
    expect(checkbox.at(1).props().checked).toEqual(options[1].checked);
    expect(checkbox.at(1).props().value).toBeDefined();
    expect(checkbox.at(1).props().value).not.toBeNull();
    expect(checkbox.at(1).props().value).toEqual(options[1].checked);
  });

  it('should have props', () => {
    expect(CheckboxOptions.propTypes.options).toBeDefined();
  });
});
