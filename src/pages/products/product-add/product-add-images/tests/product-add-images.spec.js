import React from 'react';
import { useDispatch } from 'react-redux';
import ProductAddImages from '..';
import ImagesUploadContainer from '../../../../../containers/images-upload-container';

const mockDispatch = jest.fn();
jest.mock('react-redux');
useDispatch.mockImplementation(mockDispatch);

describe('Product Add Images', () => {
  let component;
  const isEdit = true;

  beforeEach(() => {
    component = mount(
      <ProductAddImages
        productImages={[
          {
            src: 'lslsls',
            primary: true
          }
        ]}
        setProductImages={jest.fn()}
        toggleFieldsChanged
        errors={{}}
        touched={{}}
        setFieldValue={jest.fn()}
        isEdit={isEdit}
      />
    );
  });

  afterEach(() => {
    component.unmount();
  });

  it('#1 Render component', () => {
    !isEdit;
    expect(component.exists(ImagesUploadContainer)).toBe(true);
  });

  it('#2 Render component with 1 src', () => {
    expect(component.exists(ImagesUploadContainer)).toBe(true);
  });
});
