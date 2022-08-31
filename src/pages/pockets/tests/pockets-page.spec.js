import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { shallow, mount } from 'enzyme';
import mockPockets from './mockPockets';
import PocketsPage from '../pockets-page';
import LoadingBar from '../../../components/loading-bar';

import { config } from '../../../configs';

jest.mock('connected-react-router', () => ({ push: () => 0 }));
jest.mock('react-redux');

jest.mock('../../../utils/use-success-snackbar', () => {
  const snackBarMock = {
    openSuccessSnackbar: (handler) => handler()
  };
  return jest.fn(() => snackBarMock);
});

const { NO_POCKET_MESSAGE } = config.messages;

describe('UseEffect tests', () => {
  let wrapper;
  let constructorPage;
  let tableContainerRowFirst;

  const mockDispatch = jest.fn();

  useSelector.mockImplementation(() => mockPockets);
  useDispatch.mockReturnValue(mockDispatch);

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <PocketsPage />
      </BrowserRouter>
    );
    constructorPage = wrapper.find(PocketsPage);
    tableContainerRowFirst = constructorPage.find({
      id: '60fed1aee3a0252140b5b79a'
    });
  });

  it('UseEffect hook should work out', () => {
    expect(wrapper).toBeDefined();
  });

  it('deleteHandler should work out', () => {
    tableContainerRowFirst.at(0).props().deleteHandler();
    expect(wrapper).toBeDefined();
  });

  it('editHandler should work out', () => {
    tableContainerRowFirst.at(0).props().editHandler();
    expect(wrapper).toBeDefined();
  });
});

describe('pockets-page tests', () => {
  let wrapper;
  const mockDispatch = jest.fn();

  useSelector.mockImplementation(() => mockPockets);
  useDispatch.mockReturnValue(mockDispatch);

  beforeEach(() => {
    wrapper = shallow(<PocketsPage />);
  });

  it('Should render pockets-page', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
  });

  it('should render loading bar', () => {
    useSelector.mockImplementation(() => ({
      ...mockPockets,
      loading: true
    }));
    wrapper = shallow(<PocketsPage />);
    expect(wrapper.find(LoadingBar)).toBeDefined();
  });

  it('should render no pockets message', () => {
    useSelector.mockImplementation(() => ({
      ...mockPockets,
      items: []
    }));
    wrapper = shallow(<PocketsPage />);
    expect(wrapper.text().includes(NO_POCKET_MESSAGE)).toBe(true);
  });
});
