import React from 'react';
import { render } from '@testing-library/react';
import SaveButton from './save-button';
import { config, inputTypes } from '../../../configs';
import '@testing-library/jest-dom';

const { SAVE_TITLE } = config.buttonTitles;
describe('delete button tests', () => {
  const mockCallBack = jest.fn();
  const wrapper = render(
    <SaveButton
      title={SAVE_TITLE}
      type={inputTypes.submit}
      size='small'
      onClickHandler={mockCallBack}
    />
  );

  it('should exist and have value', () => {
    const component = wrapper.getByText(SAVE_TITLE);
    expect(component).toMatchSnapshot();
    expect(component).toBeDefined();
    expect(component).not.toBeNull();
    expect(SaveButton.defaultProps.size).toBeDefined();
    expect(SaveButton.defaultProps.size).toEqual('small');
    expect(SaveButton.defaultProps.onClickHandler).toBeDefined();
    expect(SaveButton.defaultProps.onClickHandler).not.toThrow();
  });
});
