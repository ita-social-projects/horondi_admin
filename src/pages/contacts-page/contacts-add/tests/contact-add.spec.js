import React from 'react';
import { useDispatch } from 'react-redux';
import ContactsForm from '../../../../components/forms/contacts-form';
import ContactsAdd from '../contacts-add';

jest.mock('react-redux');

const dispatch = jest.fn();
useDispatch.mockImplementation(() => dispatch);
describe('<ContactsAdd/>', () => {
  it('should render contacts-add', () => {
    const component = mount(<ContactsAdd />);
    expect(component).toBeDefined();
  });
  it('should handle dispatch', () => {
    const component = mount(<ContactsAdd />);
    component
      .find(ContactsForm)
      .props()
      .contactSaveHandler({
        phoneNumber: '0936450855',
        uaSchedule: 'test',
        enSchedule: 'test',
        uaAddress: 'test',
        enAddress: 'test',
        cartLink: {
          lat: '20.12585',
          lon: '47.85222'
        },
        email: 'test@gmail.com'
      });
    expect(dispatch).toHaveBeenCalled();
  });
});
