import React from 'react';
import { render } from '@testing-library/react';
import DeleteButton from './delete-button';
import { config, inputTypes } from '../../../configs';
import '@testing-library/jest-dom';

const { DELETE_TITLE } = config.buttonTitles;

describe('delete button tests', () => {
  const mockCallBack = jest.fn();
  const wrapper = render(
    <DeleteButton size='small' onClickHandler={mockCallBack} />
  );

  it('should exist and have title', () => {
    const component = wrapper.getByTitle(DELETE_TITLE);
    expect(component).toMatchSnapshot();
    expect(component).toBeDefined();
    expect(component.title).toEqual(DELETE_TITLE);
    expect(component.type).toEqual(inputTypes.button);
    expect(component).not.toBeNull();
  });
});
