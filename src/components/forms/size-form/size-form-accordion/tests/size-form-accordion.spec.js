import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '../../../../../store/store';
import SizeFormAccordion from '..';
import { config } from '../../../../../configs';

const { sizeAdd } = config.titles.sizesTitles;

const store = configureStore();

describe('SizeFormAccordion tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <SizeFormAccordion isSizeEdit={false} />
      </Provider>
    );
  });

  it('Should render the size form inside the accordion', () => {
    const sizeForm = screen.getByTestId('size-form');
    expect(sizeForm).toBeInTheDocument();
  });

  it('Should render an accordion title for size addition', () => {
    const accordionTitle = screen.getAllByText(sizeAdd);
    expect(accordionTitle).toBeDefined();
  });
});
