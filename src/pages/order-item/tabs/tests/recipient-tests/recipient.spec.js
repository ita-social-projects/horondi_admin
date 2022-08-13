import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Recipient from '../../recipient';
import { props, inputOptions, errorInputOptions } from './recipient.variables';

const setFieldValue = jest.fn();
const handleBlur = jest.fn();
const handleChange = jest.fn();

const getInputField = (testId) => {
  const fieldElement = screen.getByTestId(testId);
  return within(fieldElement).getByRole('textbox');
};

describe('tests for the Recipient component', () => {
  it('renders the Recipient input fields correctly', () => {
    render(
      <Recipient
        {...props}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
        inputOptions={{ ...inputOptions, handleBlur }}
      />
    );

    const recipientFields = Object.entries(props.data.recipient);
    recipientFields.forEach(([field, value]) => {
      const inputField = getInputField(`input-recipient.${field}`);
      expect(inputField).toHaveAttribute('value', value);
    });
  });

  it('should render errors for the fields, when validation fails for them', () => {
    render(
      <Recipient
        {...props}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
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
