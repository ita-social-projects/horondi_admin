import React from 'react';
import * as reactRedux from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import BottomForm from '../../../components/forms/bottom-form';
import constructorElementsMockStore from '../../constructorElementsMockStore';
import BottomEdit from '../bottom-edit';

configure({ adapter: new Adapter() });
describe('Bottom-page render tests', () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;
  let wrapper;
  let getState;
  const zeroIndex = 0;

  constructorElementsMockStore.bottom =
    constructorElementsMockStore.list[zeroIndex];

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => constructorElementsMockStore);
    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);

    wrapper = shallow(<BottomEdit />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
  });

  test('Should render bottom-edit', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
  });

  test(`Should render nothing when bottom is null`, () => {
    expect(wrapper.exists(BottomForm)).toBe(false);
  });

  test('useSelector hook should be called', () => {
    getState = reactRedux.useSelector(constructorElementsMockStore);
    expect(getState).toEqual(constructorElementsMockStore);
    expect(spyOnUseSelector).toHaveBeenCalled();
  });
});
