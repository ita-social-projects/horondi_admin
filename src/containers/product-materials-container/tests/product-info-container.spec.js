import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductMaterialsContainer from '../product-materials-container';

const mockProps = {
  innerMaterials: [],
  innerColors: [],
  bottomMaterials: [],
  bottomColors: [],
  mainMaterials: [
    {
      name: [{ value: 'Мальмо' }, { value: 'Malmo' }],
      _id: '6043a1653e06ad3edcdb7b08'
    }
  ],
  mainColors: [
    {
      name: [{ value: 'Червоний' }, { value: 'Red' }],
      _id: '6043a1653e06ad3edcdb7b08'
    }
  ],
  values: {
    mainColor: '6043a1653e06ad3edcdb7b08'
  },
  errors: {},
  touched: {},
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  setFieldValue: jest.fn(),
  toggleFieldsChanged: jest.fn()
};

describe('CartHeader', () => {
  it('should consist 1 item in <Badge />', () => {
    render(<ProductMaterialsContainer {...mockProps} />);

    const mainColor = screen.getByText(mockProps.mainColors[0].name[0].value);

    expect(mainColor).toBeInTheDocument();
  });
  it('should consist 1 item in <Badge />', () => {
    render(<ProductMaterialsContainer {...mockProps} />);

    const mainMaterial = screen.queryByText(
      mockProps.mainMaterials[0].name[0].value
    );

    expect(mainMaterial).not.toBeInTheDocument();
  });
});
