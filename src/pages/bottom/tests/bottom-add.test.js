import React from 'react';
import * as reactRedux from 'react-redux';
import { shallow } from 'enzyme';
import BottomForm from '../../../components/forms/bottom-form';
import LoadingBar from '../../../components/loading-bar';
import constructorElementsMockStore from '../../constructorElementsMockStore';
import BottomAdd from '../bottom-add';

describe('Bottom-page render tests', () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;
  let wrapper;
  let getState;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => constructorElementsMockStore);

    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);

    wrapper = shallow(<BottomAdd />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
  });

  test('Should render bottom-add', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
  });

  test(`Should render BottomForm wrapper`, () => {
    expect(wrapper.exists(BottomForm)).toBe(true);
  });

  test('Should render Loading Bar', () => {
    constructorElementsMockStore.loading = true;
    wrapper = shallow(<BottomAdd />);
    const loadingBar = wrapper.find(LoadingBar);
    expect(wrapper.exists(LoadingBar)).toBeDefined();
    expect(wrapper.exists(LoadingBar)).toBe(true);
    expect(loadingBar).toHaveLength(1);
    expect(wrapper.exists(BottomForm)).toBe(false);
    constructorElementsMockStore.loading = false;
  });

  test('useSelector hook should be called', () => {
    getState = reactRedux.useSelector(constructorElementsMockStore);
    expect(getState).toEqual(constructorElementsMockStore);
    expect(spyOnUseSelector).toHaveBeenCalled();
  });
});
