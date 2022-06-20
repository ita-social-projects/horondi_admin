import { handleOrderItem, address, setFormValues } from '../order';
import {
  deliveryMock,
  setFormMock,
  courierMock,
  ukrPostMock
} from './order.variables';

describe('[utils:order]', () => {
  it('handleOrderItem function should return correct value', () => {
    const result = handleOrderItem('test');

    expect(result).toBe('test');
  });

  it('address function - delivery type novaPost', () => {
    const result = address(deliveryMock);

    expect(result.city).toBe('Lviv');
    expect(result.courierOffice).toBe('office 42');
  });

  it('setFormValues function - novaPost type', () => {
    const { delivery, paymentMethod } = setFormValues(setFormMock);

    expect(paymentMethod).toBe('CARD');
    expect(delivery.courier).toEqual(courierMock);
    expect(delivery.ukrPost).toEqual(ukrPostMock);
  });
});
