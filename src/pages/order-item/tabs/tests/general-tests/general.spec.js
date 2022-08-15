import React from 'react';
import { render, screen, within } from '@testing-library/react';
import General from '../../general';
import {
  props,
  inputOptions,
  errorInputOptions,
  inputFields
} from './general.variables';

const handleBlur = jest.fn();
const handleChange = jest.fn();

describe('tests for the General component', () => {
  it('renders the General input fields correctly', () => {
    render(
      <General
        {...props}
        handleChange={handleChange}
        inputOptions={{ ...inputOptions, handleBlur }}
      />
    );

    const generalFields = Object.entries(inputFields);
    generalFields.forEach(([field, value]) => {
      const fieldElement = screen.getByTestId(`input-${field}`);
      const option = within(fieldElement).getByDisplayValue(value);
      expect(option).not.toBe(null);
    });
  });

  it('should render errors for the fields, when validation fails for them', () => {
    render(
      <General
        {...props}
        handleChange={handleChange}
        inputOptions={{ ...errorInputOptions, handleBlur }}
      />
    );
    const fields = Object.entries(errorInputOptions.errors);
    fields.forEach(([field, value]) => {
      const fieldElement = screen.getByTestId(field);
      expect(fieldElement).toHaveTextContent(value);
    });
  });
});
