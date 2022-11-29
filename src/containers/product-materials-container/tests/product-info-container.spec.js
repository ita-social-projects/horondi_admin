import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductMaterialsContainer from '../product-materials-container';

const mockProps = {
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
  touched: {}
};

describe('ProductMaterialsContainer', () => {
  beforeEach(() => render(<ProductMaterialsContainer {...mockProps} />));
  it('should consist mainColor', () => {
    const mainColor = screen.getByText(mockProps.mainColors[0].name[0].value);

    expect(mainColor).toBeInTheDocument();
  });
  it('should not consist mainMaterial', () => {
    const mainMaterial = screen.queryByText(
      mockProps.mainMaterials[0].name[0].value
    );

    expect(mainMaterial).not.toBeInTheDocument();
  });
});
