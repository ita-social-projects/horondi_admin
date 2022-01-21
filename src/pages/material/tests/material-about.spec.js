import React from 'react';
import { render } from '@testing-library/react';
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
});
