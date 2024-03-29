import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import Contacts from '../contacts-page';
import LoadingBar from '../../../components/loading-bar';
import TableContainerRow from '../../../containers/table-container-row';
import { contactsList } from './contactsList';

jest.mock('../../../hooks/filters/use-constructor-page-filter');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementationOnce((selector) => selector()),
  useDispatch: jest.fn()
}));

describe('Straps test', () => {
  let wrapper;
  let mockedDispatch;

  beforeEach(() => {
    mockedDispatch = jest.fn();

    useDispatch.mockReturnValue(mockedDispatch);
  });

  it('should render LoadingBar', () => {
    useSelector.mockReturnValue({ filter: 'test', loading: true });

    wrapper = mount(
      <BrowserRouter>
        <Contacts />
      </BrowserRouter>
    );

    expect(wrapper.exists(LoadingBar)).toBe(true);
  });

  it('should render TableContainerRow', () => {
    useSelector.mockReturnValue({
      filter: '',
      loading: false,
      contacts: contactsList
    });

    wrapper = mount(
      <BrowserRouter>
        <Contacts />
      </BrowserRouter>
    );

    expect(wrapper.exists(TableContainerRow)).toBe(true);
  });

  it('should call deleteHandler', () => {
    useSelector.mockReturnValue({
      filter: 'test',
      loading: false,
      contacts: contactsList
    });

    wrapper = mount(
      <BrowserRouter>
        <Contacts />
      </BrowserRouter>
    );

    wrapper.find(TableContainerRow).at(0).props().deleteHandler();

    expect(mockedDispatch).toHaveBeenCalled();
  });

  it('should call editHandler', () => {
    useSelector.mockReturnValue({
      filter: 'test',
      loading: false,
      contacts: contactsList
    });

    wrapper = mount(
      <BrowserRouter>
        <Contacts />
      </BrowserRouter>
    );

    wrapper.find(TableContainerRow).at(0).props().editHandler();

    expect(mockedDispatch).toHaveBeenCalled();
  });
});
