import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { shallow, mount } from 'enzyme';
import mockPosition from './mockPosition';
import PositionPage from '../position-page';
import LoadingBar from '../../../components/loading-bar';

import { config } from '../../../configs';

jest.mock('connected-react-router', () => ({ push: () => 0 }));
jest.mock('react-redux');

const { NO_POSITION_MESSAGE } = config.messages;

describe('UseEffect tests', () => {
  let wrapper;
  let constructorPage;
  let tableContainerRowFirst;
  const mockDispatch = jest.fn();

  useSelector.mockImplementation(() => mockPosition);
  useDispatch.mockImplementation(() => mockDispatch);

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <PositionPage />
      </BrowserRouter>
    );
    constructorPage = wrapper.find(PositionPage);
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

describe('position-page tests', () => {
  let wrapper;
  const mockDispatch = jest.fn();

  useSelector.mockImplementation(() => mockPosition);
  useDispatch.mockReturnValue(mockDispatch);

  beforeEach(() => {
    wrapper = shallow(<PositionPage />);
  });

  it('Should render pockets-page', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
  });

  it('should render loading bar', () => {
    useSelector.mockImplementation(() => ({
      ...mockPosition,
      loading: true
    }));
    wrapper = shallow(<PositionPage />);
    expect(wrapper.find(LoadingBar)).toBeDefined();
  });

  it('should render no pockets message', () => {
    useSelector.mockImplementation(() => ({
      ...mockPosition,
      items: []
    }));
    wrapper = shallow(<PositionPage />);
    expect(wrapper.text().includes(NO_POSITION_MESSAGE)).toBe(true);
  });
});
