import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar, Typography, Grid, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from '../home-page';
import LoadingBar from '../../../components/loading-bar';
import selectPhotosAndLoading from '../../../redux/selectors/homepage.selectors';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

const userData = {
  loading: HomePage.homePageLoading,
  photos: HomePage.photos
};

useSelector.mockImplementation(() => userData);
useDispatch.mockImplementation(() => mockDispatch);

describe('test HomePage component', () => {
  it('should render h1 label', () => {
    const { getByText } = render(<HomePage />);
    const h1 = getByText(/Головна сторінка/i, {
      selector: 'h1'
    });
    expect(h1).toBeInTheDocument();
  });
  // it('should render table component', () => {
  //   render(<Grid />);
  //   const header = screen.getByRole('document', { name: <body /> });
  //   screen.debug(header);

  //   // const div = getByRole('Grid');
  //   // userEvent.type(screen.getByLabelText(/email/i), 'john.dee@someemail.com');
  //   // fireEvent.click(screen.getByTestId('generate'));
  //   // expect(screen.getByRole('grid')).toBeInTheDocument();
  //   // expect(screen.getAllByRole('columnheader')).toHaveLength(3);

  //   // expect(div).toBeInTheDocument();
  // });
  it('should render Grid component', () => {
    const { getByRole } = render(<Grid />);
    const wrapper = getByRole('input');
    screen.debug(wrapper);
    expect(wrapper).toBeInTheDocument();
  });

  // it('should render Paper component', () => {
  //   const { getByClass } = render(<Paper />);
  //   const wrapper = screen.getByClass(
  //     'MuiPaper-root MuiPaper-elevation1 MuiPaper-rounded'
  //   );
  //   expect(wrapper).toBeInTheDocument();
  // });

  // const createRender = () => {
  //   return render(<Grid />);
  // };

  // it('should render col', () => {
  //   // const { getByText } = render(<Grid />);
  //   const { getByText } = createRender();
  //   expect(getByText('col')).toBeInTheDocument();
  // });
  // it('should render row', () => {
  //   // const { getByText } = render(<Grid />);
  //   const { getByText } = createRender();
  //   expect(getByText('row')).toBeInTheDocument();
  // });
});
