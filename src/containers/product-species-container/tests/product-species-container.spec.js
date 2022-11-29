import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductSpeciesContainerconst from '../product-species-container';

const mockProps = {
  models: [
    {
      name: [{ value: 'Бананки' }, { value: 'Banana Bags' }],
      sizes: [],
      _id: '60467f00873045422c1dbf92'
    }
  ],
  patterns: [
    {
      name: [{ value: 'Сіра стрічка' }, { value: 'Gray ribbon' }],
      _id: '619e27905bbfb0002540a2f4'
    }
  ],
  values: {
    model: '60467f00873045422c1dbf92'
  },
  errors: {},
  touched: {}
};

describe('ProductSpeciesContainerconst', () => {
  beforeEach(() => render(<ProductSpeciesContainerconst {...mockProps} />));
  it('should consist model', () => {
    const model = screen.getByText(mockProps.models[0].name[0].value);

    expect(model).toBeInTheDocument();
  });
  it('should not consist pattern', () => {
    const pattern = screen.queryByText(mockProps.patterns[0].name[0].value);

    expect(pattern).not.toBeInTheDocument();
  });
});
