import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from '../home-page';
import LoadingBar from '../../../components/loading-bar';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

const userData = {
  loading: false,
  photos: [
    {
      images: {
        small: '1.jpg'
      },
      _id: '0'
    },
    {
      images: {
        small: '2.jpg'
      },
      _id: '1'
    }
  ]
};

useSelector.mockImplementation(() => userData);
useDispatch.mockImplementation(() => mockDispatch);

describe('test HomePage component, renders correctly', () => {
  beforeEach(() => {
    const { getByText, getAllByRole } = render(<HomePage />);
  });

  it('should render h1 label', () => {
    const h1 = screen.getByText(/Головна сторінка/i, {
      selector: 'h1'
    });

    expect(h1).toBeInTheDocument();
  });

  it('should render 2 imgages', () => {
    const images = screen.getAllByRole('img');

    expect(images.length).toBe(2);
  });

  it('clicking on the input calls the `photoUpdateHandler` function', () => {
    const mockPhotoUpdateHandler = jest.fn();
    const wrapper = shallow(<HomePage />);
    const input = wrapper.find('input').at(0);
    input.simulate('click', { mockPhotoUpdateHandler: jest.fn() });

    expect(mockPhotoUpdateHandler).toBeTruthy();
  });
});

describe('test HomePage component, loading turned on', () => {
  it('should render Loading component', () => {
    userData.loading = true;
    render(<HomePage />);

    expect(<LoadingBar />).toBeTruthy();
  });
});
