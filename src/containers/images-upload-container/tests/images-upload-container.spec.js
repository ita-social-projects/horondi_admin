import React from 'react';
import { useDispatch } from 'react-redux';
import ImagesUploadContainer from '..';

const mockDispatch = jest.fn();
jest.mock('react-redux');
useDispatch.mockImplementation(mockDispatch);
describe('Images-upload-container test', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <ImagesUploadContainer handler={jest.fn()} maxFiles={8} />
    );
  });

  afterEach(() => {
    component.unmount();
  });

  it('#1 Render the component', () => {
    const input = component.find('input');
    input.simulate('drop', [
      new File([], 'img.png', { type: 'image', size: 16000000 })
    ]);
    expect(component).toBeDefined();
  });
});
