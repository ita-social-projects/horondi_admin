import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as reactRedux from 'react-redux';
import ConstructorFormContainer from '../constructor-form-container';

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
const mockDispatch = jest.fn();
useDispatchMock.mockReturnValue(mockDispatch);

describe('Constructor form container test', () => {
  const materialsByPurpose = {};
  useSelectorMock.mockReturnValue({
    materialsByPurpose
  });
  beforeEach(() => {
    render(<ConstructorFormContainer partItemKey='bottom' />);
  });

  test('test render', () => {
    screen.debug();
  });
});
