import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { noop } from 'lodash';
import SaveButton from './save-button';
import { config, inputTypes } from '../../../configs';

Enzyme.configure({ adapter: new Adapter() });

const { SAVE_TITLE } = config.buttonTitles;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector) => selector(),
  useDispatch: () => jest.fn()
}));

describe('save button tests', () => {
  const size = 'small';
  const title = SAVE_TITLE;
  const type = inputTypes.button;
  const mockCallBack = jest.fn(noop());
  let component;

  beforeEach(() => {
    component = mount(
      <SaveButton
        size={size}
        title={title}
        type={type}
        onClickHandler={mockCallBack}
      />
    );
  });

  afterEach(() => {
    component.unmount();
  });

  it('should click', () => {
    expect(component).toMatchSnapshot();
    expect(mockCallBack.mock.calls.length).toBe(0);
    component.find('button').simulate('click');
  });
  it('should exist and have value', () => {
    expect(component.exists());
    expect(component.prop('onClickHandler')).toEqual(mockCallBack);
  });
  it('should have type', () => {
    expect(component.find('button').type()).toEqual('button');
  });
  it('should have props', () => {
    expect(component.props().type).toBeDefined();
    expect(component.props().type).toEqual(type);
    expect(component.props().onClickHandler).toBeDefined();
    expect(component.props().onClickHandler).toBeTruthy();
  });
  it('should have propTypes', () => {
    expect(SaveButton.propTypes.title).toBeDefined();
    expect(SaveButton.propTypes.type).toBeDefined();
    expect(SaveButton.propTypes.onClickHandler).toBeDefined();
  });
  it('should have default props', () => {
    expect(SaveButton.defaultProps.onClickHandler).toEqual(noop);
  });
});
