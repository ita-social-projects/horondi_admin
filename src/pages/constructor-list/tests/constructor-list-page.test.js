import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { Button, Typography } from '@material-ui/core';
import { configure, shallow, mount } from 'enzyme';
import mockStore from './mockStore';
import ConstructorListPage from '../constructor-list-page';
import TableContainerGenerator from '../../../containers/table-container-generator';
import TableContainerRow from '../../../containers/table-container-row';
import LoadingBar from '../../../components/loading-bar';

import { config } from '../../../configs';

const { CREATE_CONSTRUCTOR } = config.buttonTitles;
const { pathToConstructorDetails } = config.routes;
const tableTitles = config.tableHeadRowTitles.bottoms;

configure({ adapter: new Adapter() });

describe('constructor-page tests', () => {
  let wrapper;
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;
  let typography;
  let tableContainerGenerator;
  let button;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockStore);

    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);

    wrapper = shallow(<ConstructorListPage />);
    typography = wrapper.find(Typography);
    button = wrapper.find(Button);
    tableContainerGenerator = wrapper.find(TableContainerGenerator);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
  });

  test('Should render constructor-page', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
  });
});
