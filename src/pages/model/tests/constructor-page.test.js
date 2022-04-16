import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ConstructorPage from '../constructor/constructor-page';
import { store, match } from './constructor-page.variables';
import { config } from '../../../configs';

const { constructorBasic } = config.labels.model;
const { DELETE_TITLE } = config.buttonTitles;

jest.mock('../constructor/constructor-page/constructor-page.styles.js', () => ({
  useStyles: () => ({})
}));

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  }
});

describe('Testing ConstructorPage', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ConstructorPage match={match} />
        </BrowserRouter>
      </Provider>
    );
  });

  it(`Should render component with tab named as '${constructorBasic}' set as default tab`, () => {
    const firstTab = screen.getAllByText(constructorBasic)[0].closest('button');
    expect(firstTab.getAttribute('aria-selected')).toBe('true');
  });

  it('', async () => {
    const deleteBtn = screen.getAllByTitle(DELETE_TITLE)[0];
    userEvent.click(deleteBtn);
  });

  it('', () => {});
});
