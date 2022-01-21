import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MaterialAbout from '../material-about';

describe('MaterialAbout should, ', () => {
  it(' render', () => {
    const wrapper = render(
      <BrowserRouter>
        <MaterialAbout />
      </BrowserRouter>
    );
    expect(wrapper).toBeDefined();
  });
  it(' render', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <MaterialAbout />
      </BrowserRouter>
    );
    const form = getByTestId('createMaterialButton');
    fireEvent.click(form);
    expect(form).toBeInTheDocument();
  });
});
