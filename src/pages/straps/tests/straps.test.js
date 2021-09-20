import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import Straps from '../straps-page';
import LoadingBar from '../../../components/loading-bar';
import TableContainerRow from '../../../containers/table-container-row';
import { strapsList } from './strapsList';

jest.mock('../../../hooks/filters/use-strap-filters');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementationOnce((selector) => selector()),
  useDispatch: jest.fn()
}));
Enzyme.configure({ adapter: new Adapter() });

describe('Straps test', () => {
  let wrapper;
  let mockedDispatch;

  beforeEach(() => {
    mockedDispatch = jest.fn();

    useDispatch.mockReturnValue(mockedDispatch);
  });

  it('Should render straps page', () => {
    useSelector.mockReturnValue({ filter: 'test' });

    wrapper = mount(
      <BrowserRouter>
        <Straps />
      </BrowserRouter>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render LoadingBar', () => {
    useSelector.mockReturnValue({ filter: 'test', loading: true });

    wrapper = mount(
      <BrowserRouter>
        <Straps />
      </BrowserRouter>
    );

    expect(wrapper.exists(LoadingBar)).toBe(true);
  });

  it('should render TableContainerRow', () => {
    useSelector.mockReturnValue({
      filter: '',
      loading: false,
      strapsList
    });

    wrapper = mount(
      <BrowserRouter>
        <Straps />
      </BrowserRouter>
    );

    expect(wrapper.exists(TableContainerRow)).toBe(true);
  });

  it('should call deleteHandler', () => {
    useSelector.mockReturnValue({
      filter: 'test',
      loading: false,
      strapsList
    });

    wrapper = mount(
      <BrowserRouter>
        <Straps />
      </BrowserRouter>
    );

    wrapper.find(TableContainerRow).at(0).props().deleteHandler();

    expect(mockedDispatch).toHaveBeenCalled();
  });

  it('should call editHandler', () => {
    useSelector.mockReturnValue({
      filter: 'test',
      loading: false,
      strapsList
    });

    wrapper = mount(
      <BrowserRouter>
        <Straps />
      </BrowserRouter>
    );

    wrapper.find(TableContainerRow).at(0).props().editHandler();

    expect(mockedDispatch).toHaveBeenCalled();
  });
});
