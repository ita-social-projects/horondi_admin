import React from 'react';
import { render } from '@testing-library/react';
import EditButton from './edit-button';
import { config, inputTypes } from '../../../configs';
import '@testing-library/jest-dom';

const { EDIT_TITLE } = config.buttonTitles;

describe('delete button tests', () => {
  const mockCallBack = jest.fn();
  const wrapper = render(
    <EditButton size='small' onClickHandler={mockCallBack} />
  );

  it('should exist and have title', () => {
    const component = wrapper.getByTitle(EDIT_TITLE);
    expect(component).toMatchSnapshot();
    expect(component).toBeDefined();
    expect(component.title).toEqual(EDIT_TITLE);
    expect(component.type).toEqual(inputTypes.button);
    expect(component).not.toBeNull();
  });
});
