import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import News from '../news-page';
import LoadingBar from '../../../components/loading-bar';
import TableContainerRow from '../../../containers/table-container-row';
import { newsList } from './newsList';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementationOnce((selector) => selector()),
  useDispatch: jest.fn()
}));
jest.mock('../../../utils/use-success-snackbar', () => ({
  __esModule: true,
  default: () => ({
    openSuccessSnackbar: (cb) => cb()
  })
}));

describe('News test', () => {
  let wrapper;
  let mockedDispatch;

  beforeEach(() => {
    mockedDispatch = jest.fn();

    useDispatch.mockReturnValue(mockedDispatch);
    useSelector.mockReturnValue({
      filters: { search: '' },
      loading: false,
      list: newsList
    });
  });

  it('should render LoadingBar', () => {
    useSelector.mockReturnValue({ loading: true, filters: { search: '' } });

    wrapper = mount(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );

    expect(wrapper.exists(LoadingBar)).toBe(true);
  });

  it('should render TableContainerRow', () => {
    wrapper = mount(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );

    expect(wrapper.exists(TableContainerRow)).toBe(true);
  });

  it('should call deleteHandler', () => {
    wrapper = mount(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );

    wrapper.find(TableContainerRow).at(0).props().deleteHandler();

    expect(mockedDispatch).toHaveBeenCalled();
  });

  it('should call editHandler', () => {
    wrapper = mount(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );

    wrapper.find(TableContainerRow).at(0).props().editHandler();

    expect(mockedDispatch).toHaveBeenCalled();
  });

  it('should cover branches', () => {
    newsList[0].title[0].value = null;

    useSelector.mockReturnValue({
      filters: { search: '' },
      loading: false,
      list: newsList
    });

    wrapper = mount(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );
  });
});
