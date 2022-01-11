import React from 'react';
import { render } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from '../home-page';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

const data = {
  loading: HomePage.homePageLoading,
  photos: HomePage.photos
};

useSelector.mockImplementation(() => data);
useDispatch.mockImplementation(() => mockDispatch);

describe('test HomePage component', () => {
  it('should render h1 label', () => {
    const { getByText } = render(<HomePage />);
    const h1 = getByText(/Головна сторінка/i, {
      selector: 'h1'
    });
    expect(h1).toBeInTheDocument();
  });
});
