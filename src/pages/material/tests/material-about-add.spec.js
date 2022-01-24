import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MaterialAboutAdd from '../material-about-add';

describe('MaterialAboutAdd should ', () => {
  it('render', () => {
    const wrapper = render(
      <BrowserRouter>
        <MaterialAboutAdd />
      </BrowserRouter>
    );
    expect(wrapper).toBeDefined();
  });
});
