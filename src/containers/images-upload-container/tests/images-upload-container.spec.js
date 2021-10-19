import React from 'react';
import ImagesUploadContainer from '..';

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
    input.simulate('drop', [new File([], 'img.png', { type: 'image' })]);
    expect(component).toBeDefined();
  });
});
