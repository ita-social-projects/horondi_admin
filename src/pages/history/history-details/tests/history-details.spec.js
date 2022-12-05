import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HistoryDetails from '../history-details';
import buttonTitles from '../../../../configs/button-titles';

const mockStore = {
  recordItem: {
    action: 'DELETE_EVENT',
    historyName: 'PRODUCT_EVENT',
    subject: {
      model: '6043c1983e06ad3edcdb7b32',
      name: ' Рюкзак новий',
      subjectId: '60566691158e2fdb534984d7'
    },
    userId: {
      _id: '634065f95cb2d5002887bcd7',
      email: 'gmerdok@gmail.com',
      firstName: 'Mykhailo',
      lastName: 'Shchur',
      role: 'admin'
    },
    valueAfterChange: [{}],
    valueBeforeChange: [{ length: '2' }],
    _id: '638d00d0b7ec9d1be4d333cc'
  },
  darkMode: false
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => mockStore,
  useDispatch: () => jest.fn()
}));

describe('HistoryDetails component tests', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <HistoryDetails />
      </BrowserRouter>
    );
  });
  it('Should render backButton component', () => {
    const button = screen.getByText(buttonTitles.GO_BACK_TITLE);
    screen.debug();
    expect(button).toBeInTheDocument();
  });
});
