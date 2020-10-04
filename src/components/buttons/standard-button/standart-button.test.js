import React from 'react';
import { render } from '@testing-library/react';
import StandardButton from './standard-button';
import { config } from '../../../configs';
import '@testing-library/jest-dom';

const { SAVE_TITLE } = config.buttonTitles;
describe('delete button tests', () => {
  const mockCallBack = jest.fn();
  const wrapper = render(
    <StandardButton
      title={SAVE_TITLE}
      size='small'
      onClickHandler={mockCallBack}
    />
  );

  it('should exist and have value', () => {
    const component = wrapper.getByText(SAVE_TITLE);
    expect(component).toMatchSnapshot();
    expect(component).toBeDefined();
    expect(component).not.toBeNull();
  });
});
