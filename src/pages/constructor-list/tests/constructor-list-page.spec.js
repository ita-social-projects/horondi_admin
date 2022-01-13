import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { shallow, mount } from 'enzyme';
import mockStore from './mockStore';
import ConstructorListPage from '../constructor-list-page';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';

jest.mock('react-redux');
jest.mock('connected-react-router', () => ({ push: () => 0 }));

const { NO_CONSTRUCTOR_MESSAGE } = config.messages;

const mockDispatch = jest.fn();

useDispatch.mockReturnValue(mockDispatch);
useSelector.mockImplementation(() => mockStore);

let wrapper;

describe('UseEffect tests', () => {
  let constructorPage;
  let tableContainerRowFirst;

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <ConstructorListPage />
      </BrowserRouter>
    );
    constructorPage = wrapper.find(ConstructorListPage);
    tableContainerRowFirst = constructorPage.find({
      id: '60eadfb9e913fc3f88294bd9'
    });
  });

  test('UseEffect hook should work out', () => {
    expect(mockDispatch).toHaveBeenCalled();
  });

  test('deleteHandler should work out', () => {
    tableContainerRowFirst.at(0).props().deleteHandler();
  });

  test('editHandler should work out', () => {
    tableContainerRowFirst.at(0).props().editHandler();
  });
});

describe('constructor-page tests', () => {
  beforeEach(() => {
    wrapper = shallow(<ConstructorListPage />);
  });

  test('Should render constructor-page', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
  });

  it('should render loading bar', () => {
    useSelector.mockImplementation(() => ({
      ...mockStore,
      loading: true
    }));
    wrapper = shallow(<ConstructorListPage />);
    expect(wrapper.find(LoadingBar)).toBeDefined();
  });

  it('should render no constructors message', () => {
    useSelector.mockImplementation(() => ({
      ...mockStore,
      items: []
    }));
    wrapper = shallow(<ConstructorListPage />);
    expect(wrapper.text().includes(NO_CONSTRUCTOR_MESSAGE)).toBe(true);
  });
});
